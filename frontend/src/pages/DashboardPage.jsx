import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Plus, Book } from "lucide-react";

import DashboardLayout from "../components/layout/DashboardLayout";
import Button from "../components/ui/Button";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import { useAuth } from "../context/authContext";
import BookCard from "../components/cards/BookCard";
import CreateBookModal from "../components/modals/CreateBookModal";

//skeleton loader component
const BookCardSkeleton = () => {
  return (
    <div className="animate-pulse bg-white border border-slate-200 rounded-lg shadow-sm">
      <div className="w-full aspect-[16/25] bg-slate-200 rounded-t-lg"></div>
      <div className="p-4">
        <div className="h-6 bg-slate-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-slate-200 rounded w-1/2"></div>
      </div>
    </div>
  );
};

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 text-center">
        <div
          className="fixed inset-0 bg-black/50 bg-opacity-25 transition-opacity"
          onClick={onClose}
        ></div>
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">{title}</h3>
          <p className="text-slate-600 mb-6">{message}</p>
          <div className="flex justify-end space-x-3">
            <Button onClick={onClose} variant="secondary">
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Confirm
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardPage = () => {
  const [books, setBooks] = useState([]); // Stores list of books fetched from backend
  const [isLoading, setIsLoading] = useState(true); // Tracks whether data is still loading
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // Controls create-book modal visibility
  const [bookToDelete, setBookToDelete] = useState(null); // Holds selected book for deletion
  const { user } = useAuth(); // Logged-in user information from auth context
  const navigate = useNavigate(); // Used for programmatic navigation

  useEffect(() => {
    // Fetch books once when component mounts
    const fetchBooks = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.BOOKS.GET_ALL); // Request all books from API
        setBooks(response.data); // Save fetched books to state
      } catch (error) {
        toast.error("Failed to fetch books. Please try again."); // Notify user if request fails
      } finally {
        setIsLoading(false); // Stop loading state after request completes
      }
    };
    fetchBooks();
  }, []);

  const handleDeleteBook = async () => {
    // Handles deletion of a selected book
    if (!bookToDelete) return;
    try {
      await axiosInstance.delete(
        API_PATHS.BOOKS.DELETE.replace(":id", bookToDelete),
      );
      setBooks(books.filter((book) => book._id !== bookToDelete)); // Remove deleted book from state
      toast.success("Book deleted successfully."); // Notify user of successful deletion
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete book."); // Notify user if deletion fails
    } finally {
      setBookToDelete(null); // Close confirmation modal
    }
  };

  const handleCreateBookClick = () => {
    // Opens create-book modal
    setIsCreateModalOpen(true);
  };

  const handleBookCreated = (bookId) => {
    // Runs after a book is successfully created
    setIsCreateModalOpen(false); // Close modal
    navigate(`/editor/${bookId}`); // Navigate to editor page of new book
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <div className="mx-6 flex items-center justify-between mb-8">
          <div>
            <h1 className="text-lg font-bold text-slate-900">All eBooks</h1>
            <p className="text-[13px] text-slate-600 mt-1">
              Create, edit, and manage your eBooks
            </p>
          </div>

          <Button
            onClick={handleCreateBookClick}
            className="whitespace-nowrap"
            icon={Plus}
          >
            Create New eBook
          </Button>
        </div>
        {/* Show loading state, empty state, or books list */}
        {isLoading ? (
          <div className="mx-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/*Loading state*/}
            {Array.from({ length: 4 }).map((_, i) => (
              <BookCardSkeleton key={i} />
            ))}
          </div>
        ) : books.length === 0 ? (
          <div className="mx-6 flex flex-col items-center justify-center py-12 text-center border-2 border-dashed border-slate-300 rounded-xl mt-8">
            {/*Empty state*/}
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <Book className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              No eBooks Found
            </h3>
            <p className="text-slate-500 mb-6 max-w-md">
              You haven't created any eBooks yet. Click the button above to
              create your first eBook.
            </p>
            <Button onClick={handleCreateBookClick} icon={Plus}>
              Create Your First Book
            </Button>
          </div>
        ) : (
          <div className="mx-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {/*State when books exist*/}
            {books.map((book) => (
              <BookCard
                key={book._id}
                book={book}
                onDelete={() => setBookToDelete(book._id)}
              />
            ))}
          </div>
        )}

        <ConfirmationModal
          isOpen={!!bookToDelete}
          onClose={() => setBookToDelete(null)}
          onConfirm={handleDeleteBook}
          title="Confirm Deletion"
          message="Are you sure you want to delete this book? This action cannot be undone."
        />

        <CreateBookModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onBookCreated={handleBookCreated}
        />
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
