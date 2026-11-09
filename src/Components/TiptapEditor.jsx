import React, { useEffect, useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBold,
  faItalic,
  faStrikethrough,
  faCode,
  faListUl,
  faListOl,
  faQuoteLeft,
  faLink,
  faLinkSlash,
  faRotateLeft,
  faRotateRight,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import { stripHtml } from "../Utils/textUtils.js";

const ToolbarButton = ({ onClick, isActive = false, title, disabled = false, children }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    title={title}
    aria-label={title}
    className={`h-7 px-2 sm:px-2.5 rounded-lg text-xs font-semibold flex items-center justify-center transition-all cursor-pointer ${
      isActive
        ? "bg-[#2E5BFF] text-white shadow-sm"
        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-slate-800"
    } ${disabled ? "opacity-30 cursor-not-allowed" : ""}`}
  >
    {children}
  </button>
);

const ToolbarDivider = () => (
  <div className="w-[1px] h-5 bg-slate-200 dark:bg-slate-800 mx-1 shrink-0" />
);

const TiptapEditor = ({
  content = "",
  onChange,
  placeholder = "Write your story details, breaking news, or thoughts here...",
  minHeight = "min-h-[200px]",
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-[#2E5BFF] dark:text-[#527dff] underline underline-offset-2",
          target: "_blank",
          rel: "noopener noreferrer",
        },
      }),
    ],
    content: content || "",
    onUpdate: ({ editor }) => {
      if (onChange) {
        const html = editor.isEmpty ? "" : editor.getHTML();
        onChange(html);
      }
    },
    editorProps: {
      attributes: {
        class: `focus:outline-none p-4 text-sm text-slate-800 dark:text-slate-200 tiptap-content ${minHeight}`,
      },
    },
  });

  // Sync external content changes (e.g. when loading post to edit)
  useEffect(() => {
    if (editor && content !== undefined) {
      const currentHTML = editor.getHTML();
      if (content !== currentHTML && (!editor.isFocused || editor.isEmpty)) {
        editor.commands.setContent(content || "", false);
      }
    }
  }, [content, editor]);

  const setLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Enter link URL:", previousUrl || "https://");

    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  if (!editor) {
    return (
      <div className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 p-4">
        <div className="h-40 flex items-center justify-center text-xs text-slate-400">
          Loading editor...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-900/40 focus-within:ring-2 focus-within:ring-[#2E5BFF]/20 focus-within:border-[#2E5BFF] transition-all overflow-hidden flex flex-col">
      {/* Editor Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 p-2 bg-slate-100/80 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 select-none">
        {/* Text Formatting */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
          title="Bold (Ctrl+B)"
        >
          <FontAwesomeIcon icon={faBold} className="text-xs" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
          title="Italic (Ctrl+I)"
        >
          <FontAwesomeIcon icon={faItalic} className="text-xs" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive("strike")}
          title="Strikethrough"
        >
          <FontAwesomeIcon icon={faStrikethrough} className="text-xs" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          isActive={editor.isActive("code")}
          title="Inline Code"
        >
          <FontAwesomeIcon icon={faCode} className="text-xs" />
        </ToolbarButton>

        <ToolbarDivider />

        {/* Headings */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          isActive={editor.isActive("heading", { level: 1 })}
          title="Heading 1"
        >
          <span className="font-bold text-xs">H1</span>
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={editor.isActive("heading", { level: 2 })}
          title="Heading 2"
        >
          <span className="font-bold text-xs">H2</span>
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          isActive={editor.isActive("heading", { level: 3 })}
          title="Heading 3"
        >
          <span className="font-bold text-xs">H3</span>
        </ToolbarButton>

        <ToolbarDivider />

        {/* Lists & Blocks */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive("bulletList")}
          title="Bullet List"
        >
          <FontAwesomeIcon icon={faListUl} className="text-xs" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive("orderedList")}
          title="Numbered List"
        >
          <FontAwesomeIcon icon={faListOl} className="text-xs" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive("blockquote")}
          title="Quote Block"
        >
          <FontAwesomeIcon icon={faQuoteLeft} className="text-xs" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          isActive={editor.isActive("codeBlock")}
          title="Code Block"
        >
          <span className="font-mono text-xs">{`{ }`}</span>
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title="Horizontal Rule"
        >
          <FontAwesomeIcon icon={faMinus} className="text-xs" />
        </ToolbarButton>

        <ToolbarDivider />

        {/* Links */}
        <ToolbarButton
          onClick={setLink}
          isActive={editor.isActive("link")}
          title="Add / Edit Link"
        >
          <FontAwesomeIcon icon={faLink} className="text-xs" />
        </ToolbarButton>

        {editor.isActive("link") && (
          <ToolbarButton
            onClick={() => editor.chain().focus().unsetLink().run()}
            title="Remove Link"
          >
            <FontAwesomeIcon icon={faLinkSlash} className="text-xs text-[#E76F51]" />
          </ToolbarButton>
        )}

        <ToolbarDivider />

        {/* Undo / Redo */}
        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          title="Undo (Ctrl+Z)"
        >
          <FontAwesomeIcon icon={faRotateLeft} className="text-xs" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          title="Redo (Ctrl+Y)"
        >
          <FontAwesomeIcon icon={faRotateRight} className="text-xs" />
        </ToolbarButton>
      </div>

      {/* Editor Content Area */}
      <div className="flex-1 cursor-text bg-white dark:bg-[#111827]">
        <EditorContent editor={editor} />
      </div>

      {/* Word / Character Status Bar */}
      <div className="flex items-center justify-between px-3.5 py-1.5 text-[11px] font-medium text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-800/80">
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Rich Text Editor
        </span>
        <span>
          {stripHtml(editor.getHTML()).length} characters
        </span>
      </div>
    </div>
  );
};

export default TiptapEditor;
