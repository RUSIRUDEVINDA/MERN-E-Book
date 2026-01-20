import { useMemo, useState } from "react";
import { Sparkles, Type, Eye, Maximize2 } from "lucide-react";
import Button from "../ui/Button";
import InputField from "../ui/InputField";
import SimpleMDEditor from "./SimpleMDEditor";

const ChapterEditorTab = ({
  book = {
    title: "Untitled Book",
    chapters: [
      {
        title: "Chapter 1",
        content: "-",
      },
    ],
  },
  selectedChapterIndex = 0,
  onChapterChange = () => {},
  onGenerateChapterContent = () => {},
  isGenerating,
}) => {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  //Simple Markdown parser
  const formatMarkdown = (content) => {
    return (
      content
        // Headers
        .replace(
          /^### (.*$)/gm,
          '<h3 class="text-xl font-bold mb-4 mt-6">$1</h3>',
        )
        .replace(
          /^## (.*$)/gm,
          '<h2 class="text-2xl font-bold mb-4 mt-8">$1</h2>',
        )
        .replace(
          /^# (.*$)/gm,
          '<h1 class="text-3xl font-bold mb-6 mt-8">$1</h1>',
        )

        // Bold and Italic
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')

        // Blockquotes
        .replace(
          /^> (.*$)/gm,
          '<blockquote class="border-l-4 border-violet-500 pl-4 italic text-gray-700 my-4">$1</blockquote>',
        )

        // Unordered lists
        .replace(/^- (.*$)/gm, '<li class="ml-4 mb-1">$1</li>')
        .replace(/(<li.*<\/li>)/gs, '<ul class="my-4">$1</ul>')

        // Ordered lists
        .replace(/^\d+\. (.*$)/gm, '<li class="ml-4 mb-1 list-decimal">$1</li>')
        .replace(
          /(<li class="ml-4 mb-1 list-decimal">.*<\/li>)/gs,
          '<ol class="my-4 ml-4">$1</ol>',
        )

        // Paragraphs
        .split("\n\n")
        .map((paragraph) => {
          paragraph = paragraph.trim();
          if (!paragraph) return "";

          // Skip if already wrapped in HTML tags
          if (paragraph.startsWith("<")) return paragraph;

          return `<p class="mb-4 text-justify">${paragraph}</p>`;
        })
        .join("")
    );
  };

  const mdeOptions = useMemo(() => {
    return {
      spellChecker: false,
      autofocus: true,
      toolbar: [
        "bold",
        "italic",
        "heading",
        "|",
        "quote",
        "unordered-list",
        "ordered-list",
        "|",
        "link",
        "image",
        "|",
        "preview",
        "side-by-side",
        "fullscreen",
      ],
    };
  }, []);

  if (selectedChapterIndex === null || !book.chapters[selectedChapterIndex]) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Type className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500 text-lg">
            Select a chapter to start editing
          </p>
          <p className="text-gray-400 text-sm mt-1">
            Choose from the sidebar to begin writing
          </p>
        </div>
      </div>
    );
  }

  const currentChapter = book.chapters[selectedChapterIndex];
  return (
    <div
      className={`${isFullScreen ? "fixed inset-0 z-50 bg-white" : "flex-1"} flex flex-col`}
    >
      {/* Header */}
      <div className="border-b border-gray-100 bg-white">
        <div className="px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-0 justify-between">
            <div>
              <h1 className="text-lg md:text-2xl font-bold text-gray-900">
                Chapter Editor
              </h1>
              <p className="text-sm md:text-base text-gray-500 mt-1">
                Editing:
                {currentChapter.title || `Chapter ${selectedChapterIndex + 1}`}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/*Editor Controls*/}
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setIsPreviewMode(false)}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    !isPreviewMode
                      ? "bg-violet-50 text-violet-700 border-r border-violet-200"
                      : "text-slate-600 hover:bg-gray-50"
                  }`}
                >
                  Edit
                </button>
                <button
                  onClick={() => setIsPreviewMode(true)}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    isPreviewMode
                      ? "bg-violet-50 text-violet-700"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  Preview
                </button>
              </div>

              <button
                onClick={() => setIsFullScreen(!isFullScreen)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
                title="Toggle Fullscreen"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              <Button
                onClick={() => onGenerateChapterContent(selectedChapterIndex)}
                isLoading={isGenerating === selectedChapterIndex}
                icon={Sparkles}
                size="sm"
              >
                Generate with AI
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/*Chapter Area*/}
      <div className="flex-1 overflow-hidden">
        <div className="h-full bg-white px-8 py-6">
          <div className="h-full bg-white">
            <div className="space-y-6 h-full flex flex-col">
              {/*Chapter Title*/}
              <div>
                <InputField
                  label="Chapter Title"
                  name="title"
                  value={currentChapter.title || ""}
                  onChange={onChapterChange}
                  placeholder="Enter chapter title..."
                  className="text-xl font-semibold"
                />
              </div>
              {/*Editor / Preview Area*/}
              <div className="flex-1 min-h-0">
                {isPreviewMode ? (
                  <div className="h-full border border-gray-200 rounded-lg overflow-y-auto">
                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Eye className="w-4 h-4" />
                        <span>Preview</span>
                      </div>
                    </div>
                    <div className="p-8">
                      <h1 className="text-3xl font-bold mb-6 text-gray-900">
                        {currentChapter.title || "Untitled Chapter"}
                      </h1>
                      <div
                        className="formatted-content"
                        style={{
                          fontFamily: "Inter, sans-serif",
                          lineHeight: 1.7,
                        }}
                        dangerouslySetInnerHTML={{
                          __html: currentChapter.content
                            ? formatMarkdown(currentChapter.content)
                            : '<p class="text-gray-400 italic">No content yet. Start writing to see the preview</p>',
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="h-full">
                    <SimpleMDEditor
                      value={currentChapter.content || ""}
                      onChange={(value) =>
                        onChapterChange({
                          target: { name: "content", value },
                        })
                      }
                      options={mdeOptions}
                    />
                  </div>
                )}
              </div>

              {/*Status Bar*/}
              <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-4">
                  <span>
                    Words:
                    {currentChapter.content
                      ? currentChapter.content
                          .split(/\s+/)
                          .filter((word) => word.length > 0).length
                      : 0}
                  </span>
                  <span>
                    Characters:
                    {currentChapter.content ? currentChapter.content.length : 0}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Auto-saved</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterEditorTab;
