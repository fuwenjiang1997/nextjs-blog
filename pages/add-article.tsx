import type { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Heading from '@tiptap/extension-heading'
import { Input, Button } from 'antd'
import { useState } from 'react'
import axios from 'axios'
import { useMutation } from 'react-query'
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

  async function addArticleFetch({
    title,
    content,
  }: {
    title: string
    content: string
  }) {
    await axios.post('api/addArticle', {
      title,
      content,
    })
  }

  const addArticleMutation = useMutation(addArticleFetch, {
    onSuccess() {
      alert('添加成功！')
    },
    onError() {
      alert('添加失败！')
    },
  })

  function onSubmit() {
    const htmlStr = editor?.getHTML()
    if (!title || !htmlStr) {
      alert('请填写标题和内容')
      return
    }
    addArticleMutation.mutate({ title: title, content: htmlStr })
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
