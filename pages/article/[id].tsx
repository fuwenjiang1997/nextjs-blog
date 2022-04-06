import type { GetServerSideProps } from 'next'
import axios from 'axios'
import MainLayout from '../../layout/MainLayout'
import { getUserFromReq } from '../../utils.server'
import { ArticleType } from '../index'

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

  axios.get(`http://localhost:3000/api/addReadAccount?id=${id}`)

  const result = await Promise.allSettled([getUserFromReq(ctx.req), getData()])

  const user = result[0].status === 'fulfilled' ? result[0].value : null
  const articleData: {
    data: ArticleType
  } = result[1].status === 'fulfilled' ? result[1].value.data : null

  return {
    props: {
      data: articleData.data,
      user: {
        email: user?.email,
      },
    },
  }
}

export default Article
