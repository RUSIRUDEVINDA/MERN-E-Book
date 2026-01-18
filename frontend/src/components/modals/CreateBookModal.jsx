import { useState, useRef, useEffect } from "react";
import {
  Plus,
  Sparkles,
  Trash2,
  ArrowLeft,
  BookOpen,
  Hash,
  Lightbulb,
  Palette,
} from "lucide-react";
import Modal from "../ui/Modal";
import InputField from "../ui/InputField";
import SelectField from "../ui/SelectField";
import Button from "../ui/Button";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import { useAuth } from "../../context/authContext";

const CreateBookModal = ({ isOpen, onClose, onBookCreated }) => {
  const { user } = useAuth();

  const [step, setStep] = useState(1); // Tracks current step in multi-step form
  const [bookTitle, setBookTitle] = useState(""); // Book title input
  const [numChapters, setNumChapters] = useState(5); // Number of chapters input
  const [aiTopic, setAiTopic] = useState(""); // AI-generated topic input
  const [aiStyle, setAiStyle] = useState("Informative"); // AI-generated style input
  const [chapters, setChapters] = useState([]); // Stores generated chapter outlines
  const [isGeneratingOutline, setIsGeneratingOutline] = useState(false); // Loading state for outline generation
  const [isFinalizingBook, setIsFinalizingBook] = useState(false); // Loading state for book finalization
  const chaptersContainerRef = useRef(null); // Ref for chapters container (for scrolling)

  // Reset modal state when opened or closed
  const resetModal = () => {
    setStep(1);
    setBookTitle("");
    setNumChapters(5);
    setAiTopic("");
    setAiStyle("Informative");
    setChapters([]);
    setIsGeneratingOutline(false);
    setIsFinalizingBook(false);
  };

  // Handle outline generation using AI
  const handleGenerateOutline = async () => {
    if (!bookTitle || !numChapters) {
      toast.error("Please provide both book title and number of chapters.");
      return;
    }
    setIsGeneratingOutline(true);
    try {
      const response = await axiosInstance.post(API_PATHS.AI.GENERATE, {
        topic: bookTitle,
        description: aiTopic || "No specific description provided",
        style: aiStyle,
        numChapters: numChapters,
      });
      setChapters(response.data.outline);
      setStep(2); // Move to outline review step
      toast.success(
        "Outline generated successfully! Review and edit Chapters.",
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to generate outline. Please try again.",
      );
    } finally {
      setIsGeneratingOutline(false);
    }
  };

  // Handle changes to individual chapter titles or descriptions
  const handleChapterChange = (index, field, value) => {
    const updatedChapters = [...chapters];
    updatedChapters[index][field] = value;
    setChapters(updatedChapters);
  };

  // Handle deletion of a chapter
  const handleDeleteChapter = (index) => {
    if (chapters.length <= 1) return; // Prevent deleting the last chapter
    setChapters(chapters.filter((_, i) => i !== index));
  };

  //Handle Add Chapter
  const handleAddChapter = () => {
    setChapters([
      ...chapters,
      { title: `Chapter ${chapters.length + 1}`, description: "" },
    ]);
  };

  // Handle finalizing and creating the book
  const handleFinalizeBook = async () => {
    if (!bookTitle || chapters.length === 0) {
      toast.error("Book title and at least one chapter are required.");
      return;
    }
    setIsFinalizingBook(true);
    try {
      const response = await axiosInstance.post(API_PATHS.BOOKS.CREATE, {
        title: bookTitle,
        author: user.name || "Unknown Author",
        chapters: chapters,
      });
      toast.success("Book created successfully!");
      onBookCreated(response.data.book._id);
      onClose();
      resetModal();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to create book. Please try again.",
      );
    } finally {
      setIsFinalizingBook(false);
    }
  };

  // Auto-scroll to bottom of chapters list when new chapters are added or step changes
  useEffect(() => {
    if (step === 2 && chaptersContainerRef.current) {
      // Ensure we're on the outline step
      const scrollableDiv = chaptersContainerRef.current; // Get the scrollable container
      scrollableDiv.scrollTo({
        top: scrollableDiv.scrollHeight,
        behavior: "smooth" /* Smooth scroll to bottom */,
      });
    }
  }, [chapters.length, step]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        resetModal();
        onClose();
      }}
      title="Create New Book"
    >
      {step === 1 && (
        <div className="space-y-5">
          <div className="flex items-center gap-3 mb-8 px-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-violet-100 text-sm font-semibold text-violet-600">
              1
            </div>
            <div className="flex-1 h-1 bg-violet-200 rounded-full"></div>
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-sm font-semibold text-gray-600">
              2
            </div>
          </div>

          <InputField
            icon={BookOpen}
            label="Book Title"
            placeholder="Enter your book title"
            value={bookTitle}
            onChange={(e) => setBookTitle(e.target.value)}
          />

          <InputField
            icon={Hash}
            label="Number of Chapters"
            type="number"
            min="1"
            max="20"
            placeholder="5"
            value={numChapters}
            onChange={(e) => setNumChapters(parseInt(e.target.value) || 1)}
          />

          <InputField
            icon={Lightbulb}
            label="Topic (Optional)"
            placeholder="Specific topic for AI generation..."
            value={aiTopic}
            onChange={(e) => setAiTopic(e.target.value)}
          />

          <SelectField
            icon={Palette}
            label="Writing Style"
            value={aiStyle}
            onChange={(e) => setAiStyle(e.target.value)}
            options={[
              "Informative",
              "Conversational",
              "Storytelling",
              "Persuasive",
              "Humorous",
            ]}
          />

          <div className="flex justify-end pt-6">
            <Button
              onClick={handleGenerateOutline}
              isLoading={isGeneratingOutline}
              icon={Sparkles}
            >
              Generate Outline with AI
            </Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-5">
          {/*Progress Indicator*/}
          <div className="flex items-center gap-2 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-violet-100 text-violet-600 text-sm font-semibold">
              ✓
            </div>
            <div className="flex-1 h-0.5 bg-violet-600"></div>
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-violet-200 text-violet-600 text-sm font-semibold">
              2
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Review Chapters
            </h3>
            <span className="text-sm text-gray-500">
              {chapters.length} Chapters
            </span>
          </div>

          <div
            ref={chaptersContainerRef}
            className="space-y-3 max-h-96 overflow-y-auto pr-1"
          >
            {chapters.length === 0 ? (
              <div className="text-center py-12 px-4 bg-gray-50 rounded-xl">
                <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 text text-sm">
                  No chapters generated.
                </p>
              </div>
            ) : (
              chapters.map((chapter, index) => (
                <div
                  key={index}
                  className="group p-4 border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-smtransition-all bg-white"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-violet-50 text-violet-600 text-xs font-semibold flex-shrink-0 mt-2">
                      {index + 1}
                    </div>
                    <input
                      type="text"
                      value={chapter.title}
                      onChange={(e) =>
                        handleChapterChange(index, "title", e.target.value)
                      }
                      placeholder="Chapter Title"
                      className="flex-1 text-base font-medium text-gray-900 bg-transparent border-none focus:outline-none focus:ring-0 p-0"
                    />
                    <button
                      onClick={() => handleDeleteChapter(index)}
                      className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-red-50 transition-all"
                      title="Delete Chapter"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                  <textarea
                    value={chapter.description}
                    onChange={(e) =>
                      handleChapterChange(index, "description", e.target.value)
                    }
                    placeholder="Brief description of the chapter..."
                    className="w-full pl-9 text-sm text-gray-600 bg-transparent border-none focus:outline-none focus:ring-0 resize-none placeholder-gray-400"
                    rows={2}
                  />
                </div>
              ))
            )}

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <Button
                onClick={() => setStep(1)}
                variant="ghost"
                icon={ArrowLeft}
              >
                Back
              </Button>
              <div className="flex gap-2">
                <Button
                  onClick={handleAddChapter}
                  icon={Plus}
                  variant="secondary"
                >
                  Add Chapter
                </Button>
                <Button
                  onClick={handleFinalizeBook}
                  isLoading={isFinalizingBook}
                >
                  Create Book
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default CreateBookModal;
