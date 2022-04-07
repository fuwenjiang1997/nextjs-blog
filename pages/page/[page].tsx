import type { GetServerSideProps, GetServerSidePropsContext } from 'next'
import React from 'react'
import axios from 'axios'
import MainLayout from '../../layout/MainLayout'
import HomeArticleCard from '../../components/homeArticleCard/HomeArticleCard'
import { getUserFromReq } from '../../utils.server'
import { ArticleType } from '../article/[id]'
import { getArticleListByPage } from '../../server/article'

type PropsType = {
  user: {
    email?: string
  }
  data: ArticleType[]
}

const homePage = ({ data, user }: PropsType) => {
  return (
    <MainLayout page="home" userName={user.email}>
      <div className="content-container">
        {data.map((item) => {
          return (
            <div key={item.id} style={{ marginBottom: '20px' }}>
              <HomeArticleCard data={item}></HomeArticleCard>
            </div>
          )
        })}
      </div>
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const user = await getUserFromReq(ctx.req)
  const { page } = ctx.query

  // const result: {
  //   data: ArticleType[]
  // } = await (
  //   await axios.get(
  //     `http://localhost:3000/api/getArticleList?skip=${
  //       (Number(page) - 1) * 4
  //     }&take=4`
  //   )
  // ).data
  const result = await getArticleListByPage({ skip: Number(page) - 1, take: 4 })

  return {
    props: {
      user: {
        email: user?.email || null,
      },
      data: result,
    },
  }
}

export default homePage
