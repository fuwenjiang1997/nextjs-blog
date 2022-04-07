import type { NextPage } from 'next'
import style from './index.module.css'
import Link from 'next/link'
import { ArticleType } from '../../pages/article/[id]'

type articleType = {
  data: ArticleType
}

const HomeArticleCard: NextPage<articleType> = (props) => {
  const { data } = props
  return (
    <div className={style.card}>
      <Link href={`/article/${data.id}`}>
        <h4>{data.title}</h4>
      </Link>

      <p className={style.tag}>
        <span>{data.createAt}</span>
        <span>程序软技能</span>
        <span>阅读：{data.readAccount}</span>
      </p>
      <p
        className={style.cardContent}
        dangerouslySetInnerHTML={{
          __html: data.content,
        }}
      ></p>
    </div>
  )
}

export default HomeArticleCard
