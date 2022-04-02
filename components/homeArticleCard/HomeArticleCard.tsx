import type { NextPage } from 'next'
import style from './index.module.css'
import Link from 'next/link'

type articleType = {
  title: string
}

const HomeArticleCard: NextPage<articleType> = (props) => {
  const { title } = props
  return (
    <div className={style.card}>
      <Link href="/article/123">
        <h4>{title}</h4>
      </Link>

      <p className={style.tag}>
        <span>2022/12/12</span>
        <span>程序软技能</span>
        <span>阅读：6278</span>
      </p>
      <p className={style.cardContent}>
        Nuxt3是Vue3全家桶的一员，让你能轻松实现SSR网页的制作。Nuxt3比Nuxt2新增加了12项最新的特性，包括可以完全使用Vue3的所有语法，并且对TypeScript的完美支持。
        目前Nuxt3还是Bate版本，但我相信今年就会出正式版，所以小伙伴们可以和我一起学起来。本套视频完全免费，还提供了辅导微信群，只要你肯学，一定可以学会。
      </p>
    </div>
  )
}

export default HomeArticleCard
