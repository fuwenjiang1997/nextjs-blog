import type { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Heading from '@tiptap/extension-heading'
import { Input, Button } from 'antd'
import { useState } from 'react'
import { getUserFromReq } from '../utils.server'
import MainLayout from '../layout/MainLayout'
require('../styles/addArticle.less')

type PropsType = {
  user: {
    email: string
  }
}

const addArticle = ({ user }: PropsType) => {
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
    <MainLayout page="add-article" userName={user.email}>
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

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const user = await getUserFromReq(ctx.req)
  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
    }
  }

  return {
    props: {
      user: {
        email: user?.email,
      },
    },
  }
}

export default addArticle
