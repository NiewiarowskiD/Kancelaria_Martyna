// src/components/RichTextEditor.tsx
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import Divider from '@mui/material/Divider';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  label?: string;
}

export default function RichTextEditor({ value, onChange, label }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  if (!editor) return null;

  return (
    <Box>
      {label && <Box sx={{ fontSize: '0.75rem', color: 'text.secondary', mb: 0.5 }}>{label}</Box>}
      <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
        <Stack
          direction="row"
          spacing={0.5}
          sx={{ p: 1, borderBottom: '1px solid', borderColor: 'divider', flexWrap: 'wrap' }}
        >
          <ToggleButton
            value="bold"
            size="small"
            selected={editor.isActive('bold')}
            onChange={() => editor.chain().focus().toggleBold().run()}
          >
            <FormatBoldIcon fontSize="small" />
          </ToggleButton>
          <ToggleButton
            value="italic"
            size="small"
            selected={editor.isActive('italic')}
            onChange={() => editor.chain().focus().toggleItalic().run()}
          >
            <FormatItalicIcon fontSize="small" />
          </ToggleButton>
          <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
          <ToggleButton
            value="h2"
            size="small"
            selected={editor.isActive('heading', { level: 2 })}
            onChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          >
            <LooksOneIcon fontSize="small" />
          </ToggleButton>
          <ToggleButton
            value="h3"
            size="small"
            selected={editor.isActive('heading', { level: 3 })}
            onChange={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          >
            <LooksTwoIcon fontSize="small" />
          </ToggleButton>
          <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
          <ToggleButton
            value="bulletList"
            size="small"
            selected={editor.isActive('bulletList')}
            onChange={() => editor.chain().focus().toggleBulletList().run()}
          >
            <FormatListBulletedIcon fontSize="small" />
          </ToggleButton>
          <ToggleButton
            value="orderedList"
            size="small"
            selected={editor.isActive('orderedList')}
            onChange={() => editor.chain().focus().toggleOrderedList().run()}
          >
            <FormatListNumberedIcon fontSize="small" />
          </ToggleButton>
          <ToggleButton
            value="blockquote"
            size="small"
            selected={editor.isActive('blockquote')}
            onChange={() => editor.chain().focus().toggleBlockquote().run()}
          >
            <FormatQuoteIcon fontSize="small" />
          </ToggleButton>
          <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
          <ToggleButton
            value="undo"
            size="small"
            selected={false}
            onChange={() => editor.chain().focus().undo().run()}
          >
            <UndoIcon fontSize="small" />
          </ToggleButton>
          <ToggleButton
            value="redo"
            size="small"
            selected={false}
            onChange={() => editor.chain().focus().redo().run()}
          >
            <RedoIcon fontSize="small" />
          </ToggleButton>
        </Stack>
        <Box
          sx={{
            p: 2,
            minHeight: 250,
            maxHeight: 500,
            overflowY: 'auto',
            '& .ProseMirror': { outline: 'none' },
            '& p': { m: 0, mb: 1.5 },
            '& h2': { fontSize: '1.7rem', fontWeight: 600, mt: 2, mb: 1 },
            '& h3': { fontSize: '1.4rem', fontWeight: 600, mt: 2, mb: 1 },
            '& ul, & ol': { pl: 3, mb: 1.5 },
            '& blockquote': {
              borderLeft: '3px solid',
              borderColor: 'secondary.main',
              pl: 2,
              ml: 0,
              color: 'text.secondary',
              fontStyle: 'italic',
            },
          }}
        >
          <EditorContent editor={editor} />
        </Box>
      </Box>
    </Box>
  );
}
