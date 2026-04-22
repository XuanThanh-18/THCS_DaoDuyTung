"use client";

import React from "react";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Heading3,
  ImageIcon,
  Link as LinkIcon,
  Redo2,
  Undo2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Code,
  Trash2,
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Nhập nội dung tại đây...",
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3],
        },
      }),
      Image.configure({
        allowBase64: true,
        HTMLAttributes: {
          class: "rounded-lg max-w-full h-auto",
        },
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        validate: (href) => /^https?:\/\//.test(href),
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none focus:outline-none min-h-96 px-4 py-3 text-gray-800",
      },
    },
  });

  if (!editor) {
    return null;
  }

  const addImage = () => {
    const url = prompt("Nhập đường dẫn ảnh:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const addLink = () => {
    const url = prompt("Nhập đường dẫn:");
    if (url) {
      editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    }
  };

  const toggleHeading2 = () => {
    editor.chain().focus().toggleHeading({ level: 2 }).run();
  };

  const toggleHeading3 = () => {
    editor.chain().focus().toggleHeading({ level: 3 }).run();
  };

  const toggleBold = () => {
    editor.chain().focus().toggleBold().run();
  };

  const toggleItalic = () => {
    editor.chain().focus().toggleItalic().run();
  };

  const toggleBulletList = () => {
    editor.chain().focus().toggleBulletList().run();
  };

  const toggleOrderedList = () => {
    editor.chain().focus().toggleOrderedList().run();
  };

  const toggleCode = () => {
    editor.chain().focus().toggleCode().run();
  };

  const setAlignLeft = () => {
    editor.chain().focus().clearNodes().run();
  };

  const setAlignCenter = () => {
    editor.chain().focus().setParagraph().run();
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-300 p-3 flex flex-wrap gap-2 overflow-x-auto">
        {/* Formatting */}
        <button
          onClick={toggleBold}
          className={`p-2 rounded hover:bg-gray-200 transition ${
            editor.isActive("bold") ? "bg-blue-100 text-blue-600" : ""
          }`}
          title="In đậm (Ctrl+B)"
        >
          <Bold size={18} />
        </button>

        <button
          onClick={toggleItalic}
          className={`p-2 rounded hover:bg-gray-200 transition ${
            editor.isActive("italic") ? "bg-blue-100 text-blue-600" : ""
          }`}
          title="In nghiêng (Ctrl+I)"
        >
          <Italic size={18} />
        </button>

        <button
          onClick={toggleCode}
          className={`p-2 rounded hover:bg-gray-200 transition ${
            editor.isActive("code") ? "bg-blue-100 text-blue-600" : ""
          }`}
          title="Code"
        >
          <Code size={18} />
        </button>

        <div className="w-px bg-gray-300"></div>

        {/* Headings */}
        <button
          onClick={toggleHeading2}
          className={`p-2 rounded hover:bg-gray-200 transition ${
            editor.isActive("heading", { level: 2 }) ? "bg-blue-100 text-blue-600" : ""
          }`}
          title="Tiêu đề 2"
        >
          <Heading2 size={18} />
        </button>

        <button
          onClick={toggleHeading3}
          className={`p-2 rounded hover:bg-gray-200 transition ${
            editor.isActive("heading", { level: 3 }) ? "bg-blue-100 text-blue-600" : ""
          }`}
          title="Tiêu đề 3"
        >
          <Heading3 size={18} />
        </button>

        <div className="w-px bg-gray-300"></div>

        {/* Lists */}
        <button
          onClick={toggleBulletList}
          className={`p-2 rounded hover:bg-gray-200 transition ${
            editor.isActive("bulletList") ? "bg-blue-100 text-blue-600" : ""
          }`}
          title="Danh sách"
        >
          <List size={18} />
        </button>

        <button
          onClick={toggleOrderedList}
          className={`p-2 rounded hover:bg-gray-200 transition ${
            editor.isActive("orderedList") ? "bg-blue-100 text-blue-600" : ""
          }`}
          title="Danh sách có thứ tự"
        >
          <ListOrdered size={18} />
        </button>

        <div className="w-px bg-gray-300"></div>

        {/* Media */}
        <button
          onClick={addImage}
          className="p-2 rounded hover:bg-gray-200 transition"
          title="Chèn ảnh"
        >
          <ImageIcon size={18} />
        </button>

        <button
          onClick={addLink}
          className="p-2 rounded hover:bg-gray-200 transition"
          title="Chèn liên kết"
        >
          <LinkIcon size={18} />
        </button>

        <div className="w-px bg-gray-300"></div>

        {/* Undo/Redo */}
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="p-2 rounded hover:bg-gray-200 transition disabled:opacity-50"
          title="Hoàn tác"
        >
          <Undo2 size={18} />
        </button>

        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="p-2 rounded hover:bg-gray-200 transition disabled:opacity-50"
          title="Làm lại"
        >
          <Redo2 size={18} />
        </button>

        <div className="w-px bg-gray-300"></div>

        {/* Clear */}
        <button
          onClick={() => editor.chain().focus().clearContent().run()}
          className="p-2 rounded hover:bg-red-100 text-red-600 transition"
          title="Xóa tất cả"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  );
}
