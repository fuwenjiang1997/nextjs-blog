import type { GetServerSideProps, GetServerSidePropsContext } from 'next'
import React from 'react'
import MainLayout from '../layout/MainLayout'
import HomeArticleCard from '../components/homeArticleCard/HomeArticleCard'
import { getUserFromReq } from '../utils.server'
require('../styles/home.less')

type DataType = {
  id: number
  title: string
  content: string
  createDate: string
  tag: string
  readAccount: number
}

type PropsType = {
  user: {
    email: string
  }
  data: DataType[]
}

const homePage = ({ user, data }: PropsType) => {
  return (
    <MainLayout page="home" userName={user.email}>
      <div className="content-container">
        {data.map((item) => {
          return (
            <div key={item.id} style={{ marginBottom: '20px' }}>
              <HomeArticleCard title={item.title}></HomeArticleCard>
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
  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
    }
  }

  const data: DataType[] = [
    {
      id: 1,
      title: '你分手地方',
      content:
        ' Nuxt3是Vue3全家桶的一员，让你能轻松实现SSR网页的制作。Nuxt3比Nuxt2新增加了12项最新的特性，包括可以完全使用Vue3的所有语法，并且对TypeScript的完美支持。目前Nuxt3还是Bate版本，但我相信今年就会出正式版，所以小伙伴们可以和我一起学起来。本套视频完全免费，还提供了辅导微信群，只要你肯学，一定可以学会。',
      createDate: '2022/12/12',
      tag: '程序软技能',
      readAccount: 1233,
    },
  ]

  return {
    props: {
      user: {
        email: user?.email,
      },
      data: data,
    },
  }
}

export default homePage
