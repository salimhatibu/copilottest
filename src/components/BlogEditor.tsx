import React, { useEffect, useRef, useState } from 'react'

interface BlogEditorProps {
  initialValue?: string
  onChange: (content: string) => void
}

export function BlogEditor({ initialValue = '', onChange }: BlogEditorProps) {
  const [content, setContent] = useState(initialValue)
  const editorRef = useRef<HTMLTextAreaElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value
    setContent(newContent)
    onChange(newContent)
  }

  return (
    <div className="editor-shell">
      <div className="editor-toolbar">
        <button type="button" title="Bold" onClick={() => insertMarkdown(editorRef, '**', '**')}>B</button>
        <button type="button" title="Italic" onClick={() => insertMarkdown(editorRef, '*', '*')}>I</button>
        <button type="button" title="Link" onClick={() => insertMarkdown(editorRef, '[', '](url)')}>Link</button>
      </div>
      <textarea
        ref={editorRef}
        className="blog-editor"
        value={content}
        onChange={handleChange}
        placeholder="Write your post here..."
      />
    </div>
  )
}

function insertMarkdown(ref: React.RefObject<HTMLTextAreaElement>, before: string, after: string) {
  if (!ref.current) return
  const start = ref.current.selectionStart
  const end = ref.current.selectionEnd
  const selected = ref.current.value.substring(start, end)
  const newValue = ref.current.value.substring(0, start) + before + selected + after + ref.current.value.substring(end)
  ref.current.value = newValue
  ref.current.focus()
}
