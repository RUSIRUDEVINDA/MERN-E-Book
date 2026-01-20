import InputField from "../ui/InputField";
import Button from "../ui/Button";
import { UploadCloud } from "lucide-react";
import { BASE_URL } from "../../utils/apiPaths";

// Component for editing book details and cover image

const BookDetailsTab = ({
  book,
  onBookChange,
  onCoverImageUpload,
  isUploading,
  fileInputRef,
}) => {
  const coverImageUrl = book?.coverImage
    ? book.coverImage.startsWith("http")
      ? book.coverImage
      : book.coverImage.startsWith("/")
      ? `${BASE_URL}${book.coverImage}`.replace(/\\/g, "/")
      : `${BASE_URL}/backend/uploads/${book.coverImage}`.replace(/\\/g, "/")
    : null;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          Book Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Title"
            name="title"
            value={book?.title || ""}
            onChange={onBookChange}
          />

          <InputField
            label="Author"
            name="author"
            value={book?.author || ""}
            onChange={onBookChange}
          />

          <div className="md:col-span-2">
            <InputField
              label="Subtitle"
              name="subtitle"
              value={book?.subtitle || ""}
              onChange={onBookChange}
            />
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm mt-8">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          Cover Image
        </h3>

        <div className="flex items-start gap-6">
          {coverImageUrl ? (
            <img
              src={coverImageUrl}
              alt="Cover"
              className="w-32 h-48 object-cover rounded-lg shadow-md"
            />
          ) : (
            <div className="w-32 h-48 bg-slate-200 rounded-lg flex items-center justify-center border border-slate-300">
              <UploadCloud className="w-8 h-8 text-slate-400" />
            </div>
          )}

          <div>
            <p className="text-sm text-slate-600 mb-4">
              Upload a new cover image. Recommended size: 600×900 pixels or
              similar aspect ratio.
            </p>

            <input
              type="file"
              ref={fileInputRef}
              onChange={onCoverImageUpload}
              className="hidden"
              accept="image/*"
            />

            <Button
              variant="secondary"
              onClick={() => fileInputRef.current?.click()}
              isLoading={isUploading}
            >
              Upload Image
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BookDetailsTab;
