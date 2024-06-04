import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { FaItalic } from 'react-icons/fa'
import { ImBold } from 'react-icons/im'
import './tiptap.css'
import Underline from '@tiptap/extension-underline'
import { MdFormatUnderlined } from 'react-icons/md'

// define your extension array
const extensions = [
  StarterKit,
  Underline

]

const content = ''

const Tiptap = ({setEditorDescription}) => {
  const editor = useEditor({
    extensions,
    content,
    onUpdate({ editor }) {
        setEditorDescription(editor.getJSON())
      },
  })

  if (!editor) {
    return null
  }

  return (
    <div className='my-2'>
        <div className='flex gap-3 items-center'>
        <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleBold()
            .run()
        }
        className={editor.isActive('bold text-2xl') ? 'is-active' : 'text-2xl'}
      >
        <ImBold />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleItalic()
            .run()
        }
        className={editor.isActive('italic text-2xl') ? 'is-active' : 'text-2xl'}
      >
       <FaItalic />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive('underline text-2xl') ? 'is-active' : ' text-2xl'}
      >
        <MdFormatUnderlined />
      </button>
        </div>
     <div className='mt-3'>
     <EditorContent  className='border-2 rounded-lg  h-32'  editor={editor} />
     </div>
    </div>
  )
}

export default Tiptap
