import type { NextPage } from 'next'
import MainLayout from '../layout/MainLayout'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Heading from '@tiptap/extension-heading'
import { Input, Button } from 'antd'
import { useState } from 'react'
require('../styles/addArticle.less')

const addArticle: NextPage = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({
        HTMLAttributes: {
          class: 'my-custom-class',
        },
        levels: [1, 2, 3],
      }),
    ],
    content: '开始你的表演吧',
  })
  const [title, setTitle] = useState('')

  function onSubmit() {
    console.log(`
      点击了提交:
      title: ${title}, \n
      content: ${editor?.getHTML()} \n
    `)
  }

  return (
    <MainLayout page="add-article">
      <Input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        className="article-title"
        placeholder="标题"
      />
      <EditorContent editor={editor} />
      <Button
        style={{ float: 'right', marginTop: '10px' }}
        type="primary"
        onClick={onSubmit}
      >
        提交
      </Button>
    </MainLayout>
  )
}

export default addArticle
