import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/apiPaths";
import { Edit, Trash2 } from "lucide-react";

const BookCard = ({ book, onDelete }) => {
  const navigate = useNavigate();

  // Use Cloudinary URL directly if available, otherwise fallback to local
  const coverImageUrl = book?.coverImage
    ? book.coverImage.startsWith("http")
      ? book.coverImage
      : `${BASE_URL}/backend/uploads/${book.coverImage}`.replace(/\\/g, "/")
    : "";
  return (
    <div
      className="group relative bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-xl hover:shadow-gray-100/50 hover:-translate-y-1 cursor-pointer"
      onClick={() => navigate(`/view-book/${book._id}`)}
    >
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <img
          src={coverImageUrl || undefined}
          alt={book.title}
          className="w-full aspect-[16/25] object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.src = null;
          }}
        />
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/editor/${book._id}`);
            }}
            className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors cursor-pointer"
          >
            <Edit className="w-4 h-4 text-gray-700" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(book._id);
            }}
            className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-red-50 transition-colors group/delete cursor-pointer"
          >
            <Trash2 className="w-4 h-4 text-red-500 group-hover/delete:text-red-600" />
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent backdrop-blur-xs"></div>
        <div className="relative">
          <h3 className="font-semibold text-white text-sm leading-tight line-clamp-2 mb-1">
            {book.title}
          </h3>
          <p className="text-[13px] text-gray-300 font-medium">{book.author}</p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};

export default BookCard;
