import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FileDown, Menu, X, ChevronDown } from "lucide-react";

import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import ViewChapterSidebar from "../components/view/ViewChapterSidebar";
import Button from "../components/ui/Button";
import Dropdown, { DropdownItem } from "../components/ui/Dropdown";

const ViewBookPage = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [fontSize, setFontSize] = useState(16);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axiosInstance.get(
          API_PATHS.BOOKS.GET_BY_ID.replace(":id", bookId),
        );
        setBook(response.data);
      } catch (error) {
        toast.error("Failed to load book. Please try again.");
        navigate("/dashboard");
      } finally {
        setIsLoading(false);
      }
    };
    fetchBook();
  }, [bookId, navigate]);

  const handleExportPDF = async () => {
    if (!book) return;
    try {
      const response = await axiosInstance.get(
        API_PATHS.EXPORT.EXPORT_PDF.replace(":id", bookId),
        { responseType: "blob" },
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${book.title}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("PDF exported successfully!");
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to export PDF.");
    }
  };

  const handleExportDoc = async () => {
    if (!book) return;
    try {
      const response = await axiosInstance.get(
        API_PATHS.EXPORT.EXPORT_DOCX.replace(":id", bookId),
        { responseType: "blob" },
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${book.title}.docx`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Document exported successfully!");
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to export document.");
    }
  };

  const formatMarkdown = (content) => {
    return content
      .replace(
        /^### (.*$)/gm,
        '<h3 class="text-xl font-bold mb-4 mt-6">$1</h3>',
      )
      .replace(
        /^## (.*$)/gm,
        '<h2 class="text-2xl font-bold mb-4 mt-8">$1</h2>',
      )
      .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mb-6 mt-8">$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(
        /^> (.*$)/gm,
        '<blockquote class="border-l-4 border-violet-500 pl-4 italic text-gray-700 my-4">$1</blockquote>',
      )
      .replace(/^- (.*$)/gm, '<li class="ml-4 mb-1">$1</li>')
      .replace(/(<li.*<\/li>)/gs, '<ul class="my-4">$1</ul>')
      .replace(/^\d+\. (.*$)/gm, '<li class="ml-4 mb-1 list-decimal">$1</li>')
      .replace(
        /(<li class="ml-4 mb-1 list-decimal">.*<\/li>)/gs,
        '<ol class="my-4 ml-4">$1</ol>',
      )
      .split("\n\n")
      .map((paragraph) => {
        paragraph = paragraph.trim();
        if (!paragraph) return "";
        if (paragraph.startsWith("<")) return paragraph;
        return `<p class="mb-4 text-justify">${paragraph}</p>`;
      })
      .join("");
  };

  if (isLoading || !book) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-slate-600">Loading book...</p>
      </div>
    );
  }

  const currentChapter = book.chapters?.[selectedChapterIndex];

  return (
    <div className="flex bg-slate-50 font-sans min-h-screen">
      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 flex md:hidden"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="fixed inset-0 bg-black/20 bg-opacity-75"
            aria-hidden="true"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                type="button"
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setIsSidebarOpen(false)}
              >
                <span className="sr-only">Close sidebar</span>
                <X className="h-6 w-6 text-white" />
              </button>
            </div>
            <ViewChapterSidebar
              book={book}
              selectedChapterIndex={selectedChapterIndex}
              onSelectChapter={(index) => {
                setSelectedChapterIndex(index);
                setIsSidebarOpen(false);
              }}
              onBack={() => navigate("/dashboard")}
            />
          </div>
          <div className="flex-shrink-0 w-14" aria-hidden="true"></div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:flex-shrink-0 sticky top-0 h-screen">
        <ViewChapterSidebar
          book={book}
          selectedChapterIndex={selectedChapterIndex}
          onSelectChapter={setSelectedChapterIndex}
          onBack={() => navigate("/dashboard")}
        />
      </div>

      {/* Main Content */}
      <main className="flex-1 h-full flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-slate-200 py-4 px-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2 text-slate-500 hover:text-slate-800"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-lg md:text-2xl font-bold text-slate-900">
                {book.title}
              </h1>
              <p className="text-xs md:text-sm text-slate-500 mt-1">
                by {book.author}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Font Size Controls */}
            <div className="flex items-center gap-2 bg-slate-100 rounded-lg px-2 py-1">
              <button
                onClick={() => setFontSize(Math.max(12, fontSize - 2))}
                className="text-sm font-semibold text-slate-600 hover:text-slate-900 px-2 py-1"
                title="Decrease font size"
              >
                A−
              </button>
              <span className="text-xs text-slate-600 min-w-[40px] text-center">
                {fontSize}px
              </span>
              <button
                onClick={() => setFontSize(Math.min(28, fontSize + 2))}
                className="text-sm font-semibold text-slate-600 hover:text-slate-900 px-2 py-1"
                title="Increase font size"
              >
                A+
              </button>
            </div>

            <Dropdown
              trigger={
                <Button variant="secondary" icon={FileDown}>
                  Export
                  <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
              }
            >
              <DropdownItem onClick={handleExportPDF}>Export as PDF</DropdownItem>
              <DropdownItem onClick={handleExportDoc}>
                Export as DOCX
              </DropdownItem>
            </Dropdown>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          <div className="max-w-4xl mx-auto px-6 py-10">
            {currentChapter ? (
              <div>
                <div
                  className="formatted-content prose prose-slate"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    lineHeight: 1.8,
                    fontSize: `${fontSize}px`,
                  }}
                  dangerouslySetInnerHTML={{
                    __html: currentChapter.content
                      ? formatMarkdown(currentChapter.content)
                      : '<p class="text-slate-400 italic">No content available for this chapter.</p>',
                  }}
                />
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-slate-400">No chapter selected</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer - Navigation and Stats */}
        <div className="bg-white border-t border-slate-200 px-6 py-4">
          <div className="max-w-4xl mx-auto">
            {/* Chapter Navigation */}
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={() => {
                  if (selectedChapterIndex > 0) {
                    setSelectedChapterIndex(selectedChapterIndex - 1);
                  }
                }}
                disabled={selectedChapterIndex === 0}
                className="text-xs px-3 py-1.5 bg-slate-100 hover:bg-slate-200 disabled:bg-slate-50 disabled:text-slate-300 text-slate-700 rounded transition-colors"
              >
                ← Previous Chapter
              </button>
              <span className="text-xs text-slate-500">
                {selectedChapterIndex + 1} of {book?.chapters?.length || 0}
              </span>
              <button
                onClick={() => {
                  if (selectedChapterIndex < (book?.chapters?.length || 0) - 1) {
                    setSelectedChapterIndex(selectedChapterIndex + 1);
                  }
                }}
                disabled={selectedChapterIndex === (book?.chapters?.length || 0) - 1}
                className="text-xs px-3 py-1.5 bg-slate-100 hover:bg-slate-200 disabled:bg-slate-50 disabled:text-slate-300 text-slate-700 rounded transition-colors"
              >
                Next Chapter →
              </button>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between text-xs text-slate-500 border-t pt-3">
              <div className="flex items-center gap-4">
                <span>
                  Words:{" "}
                  {currentChapter?.content
                    ? currentChapter.content
                        .split(/\s+/)
                        .filter((word) => word.length > 0).length
                    : 0}
                </span>
                <span>
                  Characters:{" "}
                  {currentChapter?.content ? currentChapter.content.length : 0}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ViewBookPage;
