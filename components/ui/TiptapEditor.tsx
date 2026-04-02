'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import styles from '@/assets/styles/components/ui/TiptapEditor.module.scss';

interface ToolbarMessages {
  bold: string;
  italic: string;
  underline: string;
  strikethrough: string;
  heading2: string;
  heading3: string;
  bulletList: string;
  orderedList: string;
  blockquote: string;
  horizontalRule: string;
  undo: string;
  redo: string;
}

interface TiptapEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
  toolbarMessages: ToolbarMessages;
}

export type { ToolbarMessages };

export default function TiptapEditor({
  content,
  onChange,
  placeholder,
  toolbarMessages,
}: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({ placeholder }),
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor: e }) => {
      onChange(e.getHTML());
    },
  });

  if (!editor) return null;

  const btnClass = (active: boolean) =>
    `${styles['toolbar-btn']} ${active ? styles['toolbar-btn--active'] : ''}`;

  return (
    <div className={styles.editor}>
      <div className={styles.toolbar} role="toolbar" aria-label="Text formatting">
        <div className={styles['toolbar-group']}>
          <button
            type="button"
            className={btnClass(editor.isActive('heading', { level: 2 }))}
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            aria-label={toolbarMessages.heading2}
            title={toolbarMessages.heading2}
          >
            H2
          </button>
          <button
            type="button"
            className={btnClass(editor.isActive('heading', { level: 3 }))}
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            aria-label={toolbarMessages.heading3}
            title={toolbarMessages.heading3}
          >
            H3
          </button>
        </div>

        <span className={styles['toolbar-divider']} aria-hidden="true" />

        <div className={styles['toolbar-group']}>
          <button
            type="button"
            className={btnClass(editor.isActive('bold'))}
            onClick={() => editor.chain().focus().toggleBold().run()}
            aria-label={toolbarMessages.bold}
            title={toolbarMessages.bold}
          >
            <strong>B</strong>
          </button>
          <button
            type="button"
            className={btnClass(editor.isActive('italic'))}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            aria-label={toolbarMessages.italic}
            title={toolbarMessages.italic}
          >
            <em>I</em>
          </button>
          <button
            type="button"
            className={btnClass(editor.isActive('underline'))}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            aria-label={toolbarMessages.underline}
            title={toolbarMessages.underline}
          >
            <u>U</u>
          </button>
          <button
            type="button"
            className={btnClass(editor.isActive('strike'))}
            onClick={() => editor.chain().focus().toggleStrike().run()}
            aria-label={toolbarMessages.strikethrough}
            title={toolbarMessages.strikethrough}
          >
            <s>S</s>
          </button>
        </div>

        <span className={styles['toolbar-divider']} aria-hidden="true" />

        <div className={styles['toolbar-group']}>
          <button
            type="button"
            className={btnClass(editor.isActive('bulletList'))}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            aria-label={toolbarMessages.bulletList}
            title={toolbarMessages.bulletList}
          >
            •
          </button>
          <button
            type="button"
            className={btnClass(editor.isActive('orderedList'))}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            aria-label={toolbarMessages.orderedList}
            title={toolbarMessages.orderedList}
          >
            1.
          </button>
          <button
            type="button"
            className={btnClass(editor.isActive('blockquote'))}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            aria-label={toolbarMessages.blockquote}
            title={toolbarMessages.blockquote}
          >
            &ldquo;
          </button>
          <button
            type="button"
            className={styles['toolbar-btn']}
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            aria-label={toolbarMessages.horizontalRule}
            title={toolbarMessages.horizontalRule}
          >
            ―
          </button>
        </div>

        <span className={styles['toolbar-divider']} aria-hidden="true" />

        <div className={styles['toolbar-group']}>
          <button
            type="button"
            className={styles['toolbar-btn']}
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            aria-label={toolbarMessages.undo}
            title={toolbarMessages.undo}
          >
            ↩
          </button>
          <button
            type="button"
            className={styles['toolbar-btn']}
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            aria-label={toolbarMessages.redo}
            title={toolbarMessages.redo}
          >
            ↪
          </button>
        </div>
      </div>

      <EditorContent editor={editor} className={styles.content} />
    </div>
  );
}
