import { ArrowLeft } from "lucide-react";
import Button from "../ui/Button";

const ViewChapterSidebar = ({ book, selectedChapterIndex, onSelectChapter, onBack }) => {
  if (!book || !book.chapters) {
    return null;
  }

  return (
    <aside className="w-80 h-full bg-white border-r border-slate-200 flex flex-col">
      <div className="p-4 border-b border-slate-200">
        <Button
          onClick={onBack}
          variant="ghost"
          icon={ArrowLeft}
          className="w-full justify-start mb-4"
        >
          Back to Books
        </Button>
        <h2
          className="text-base font-semibold text-slate-800 mt-4 truncate"
          title={book.title}
        >
          {book.title}
        </h2>
        <p className="text-xs text-slate-500 mt-1">by {book.author}</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="space-y-1 p-3">
          {book.chapters.map((chapter, index) => (
            <button
              key={index}
              onClick={() => onSelectChapter(index)}
              className={`w-full text-left p-3 text-sm rounded-lg transition-colors ${
                selectedChapterIndex === index
                  ? "bg-violet-50/50 font-semibold text-violet-800"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
              title={chapter.title}
            >
              <span className="truncate block">{chapter.title}</span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default ViewChapterSidebar;
