import type { GetServerSideProps } from 'next'
import axios from 'axios'
import MainLayout from '../../layout/MainLayout'
import { getUserFromReq } from '../../utils.server'
import { getArticleById } from '../../server/article'

export type ArticleType = {
  id: number
  userId: number
  title: string
  content: string
  createAt: string
  tag?: string
  readAccount: number
}

type PropsType = {
  user: {
    email: string
  }
  data: ArticleType
}

const Article = ({ data, user }: PropsType) => {
  return (
    <MainLayout page="" userName={user.email}>
      <div
        className="content-container"
        style={{ background: '#fff', marginTop: '30px', padding: '0 20px' }}
      >
        <div className="content-container">
          <h3>{data.title}</h3>
          <div
            dangerouslySetInnerHTML={{
              __html: data.content,
            }}
          ></div>
        </div>
      </div>
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = ctx.query.id
  function getData() {
    return axios.get(`http://localhost:3000/api/getArticleById?id=${id}`)
  }

  // axios.get(`http://localhost:3000/api/addReadAccount?id=${id}`)

  const result = await Promise.allSettled([
    getUserFromReq(ctx.req),
    getArticleById(Number(id)),
  ])

  const user = result[0].status === 'fulfilled' ? result[0].value : null
  const articleData = result[1].status === 'fulfilled' ? result[1].value : null

  return {
    props: {
      data: articleData,
      user: {
        email: user?.email || null,
      },
    },
  }
}

export default Article
