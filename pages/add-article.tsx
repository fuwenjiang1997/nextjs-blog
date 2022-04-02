import type { NextPage } from 'next'
import MainLayout from '../layout/MainLayout'

const addArticle: NextPage = () => {
  return (
    <MainLayout page="add-article">
      <div>添加文章</div>
    </MainLayout>
  )
}

export default addArticle
