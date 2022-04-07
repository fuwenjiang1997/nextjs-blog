import type { GetServerSideProps, GetServerSidePropsContext } from 'next'
import MainLayout from '../layout/MainLayout'
import HomeArticleCard from '../components/homeArticleCard/HomeArticleCard'
import { ArticleType } from './article/[id]'
import { getUserFromReq } from '../utils.server'
import { User } from '@prisma/client'
import { getUserArticle } from '../server/article'
import superjson from 'superjson'
require('../styles/user.less')

const uesrPage = ({ data, user }: { data: ArticleType[]; user: User }) => {
  return (
    <MainLayout page="user-page" userName={user.email}>
      <div className="content-container">
        <div className="header">
          <p>{user.name}</p>
          <div className="simple-information">
            <div className="item">
              20,371 <span>被访问</span>
            </div>
            <div className="item">
              24 <span>原创</span>
            </div>
            <div className="item">
              61,229 <span>排名</span>
            </div>
          </div>
        </div>
        <div className="article-container">
          {data.map((item) => (
            <HomeArticleCard key={item.id} data={item}></HomeArticleCard>
          ))}
        </div>
      </div>
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
  const article = await getUserArticle(user.id)

  return {
    props: {
      user: user,
      data: article,
    },
  }
}

export default uesrPage
