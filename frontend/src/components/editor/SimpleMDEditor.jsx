import { Type } from "lucide-react";
import MDEditor, { commands } from "@uiw/react-md-editor";
const SimpleMDEditor = ({ value, onChange, options }) => {
  return (
    <div
      className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
      data-color-mode="light"
    >
      {/*Header*/}
      <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Type className="w-4 h-4" />
          <span>Markdown Editor</span>
        </div>
      </div>

      {/*Editor*/}
      <div className="p-0">
        <MDEditor
          value={value}
          onChange={onChange}
          height={400}
          preview="live"
          commands={[
            commands.bold,
            commands.italic,
            commands.strikethrough,
            commands.hr,
            commands.title,
            commands.divider,
            commands.link,
            commands.code,
            commands.image,
            commands.unorderedListCommand,
            commands.orderedListCommand,
            commands.checkedListCommand,
          ]}
          visibleDragbar={false}
        />
      </div>
    </div>
  );
};

export default SimpleMDEditor;
