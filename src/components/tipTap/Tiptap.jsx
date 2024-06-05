import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { FaItalic } from "react-icons/fa";
import { ImBold } from "react-icons/im";
import "./tiptap.css";
import Underline from "@tiptap/extension-underline";
import { MdFormatListBulleted, MdFormatUnderlined } from "react-icons/md";
import BulletList from "@tiptap/extension-bullet-list";

// define your extension array
const extensions = [StarterKit, Underline, BulletList];

const Tiptap = ({ setEditorDescription, editorDescription }) => {
  const editor = useEditor({
    extensions,
    editorProps: {
      attributes: {
        class:
          "flex flex-col px-4 py-3 justify-start text-gray-900 items-start w-full gap-3 font-medium pt-4 outline-none",
      },
    },
    content:editorDescription,
    onUpdate({ editor }) {
      setEditorDescription(editor.getJSON());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="my-2 w-full">
      <div className="flex gap-3 items-center border border-black rounded-b-none rounded p-3 ">
        <button
          type="button"
          onClick={(e) => {
            editor.chain().focus().toggleBold().run();
          }}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={
            editor.isActive("bold text-2xl") ? "is-active" : "text-2xl"
          }
        >
          <ImBold />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={
            editor.isActive("italic text-2xl") ? "is-active" : "text-2xl"
          }
        >
          <FaItalic />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={
            editor.isActive("underline text-2xl") ? "is-active" : " text-2xl"
          }
        >
          <MdFormatUnderlined />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={
            editor.isActive("bulletList text-2xl") ? "is-active" : "text-2xl"
          }
        >
          <MdFormatListBulleted />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 }) ? "is-active" : ""
          }
        >
          h1
        </button>
      </div>
      <div className="border-b border-r border-l max-h-32 overflow-y-scroll rounded rounded-t-none border-gray-700">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default Tiptap;
