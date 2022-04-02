import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import MainLayout from '../../layout/MainLayout'

const Article: NextPage = () => {
  const router = useRouter()
  const { id } = router.query
  return (
    <MainLayout page="">
      <div
        className="content-container"
        style={{ background: '#fff', marginTop: '30px', padding: '0 20px' }}
      >
        <div className="content-container">
          <h3>文章详情页 {id}</h3>
          <div>
            uxt3是Vue3全家桶的一员，让你能轻松实现SSR网页的制作。Nuxt3比Nuxt2新增加了12项最新的特性，包括可以完全使用Vue3的所有语法，并且对TypeScript的完美支持。
            目前Nuxt3还是Bate版本，但我相信今年就会出正式版，所以小伙伴们可以和我一起学起来。本套视频完全免费，还提供了辅导微信群，只要你肯学，一定可以学会。
            01. Nuxt3简介和环境搭建 Nuxt3的简介
            Nuxt3是基于Vue3发布的SSR框架，也是Vue全家桶系列的一员。如果你了解Nuxt2，应该也了解Nuxt3的使命和用途。但是如果你不了解，你需要先知道两个概念。
            SPA应用：也就是单页应用，这些多是在客户端的应用，不能进行SEO优化（搜索引擎优化）。
            SSR应用：在服务端进行渲染，渲染完成后返回给客户端，每个页面有独立的URL，对SEO友好。
            所以如果你开发的应用是企业网站、商品展示
            、博客这类型的展示型网站，就需要使用搜索引擎喜欢的SSR应用。当我们明白这两个概念后，再来看Nuxt3的使命。因为Vue开发的应用默认是单页应用（SPA应用），但如果你想针对于搜索优化，就需要使用Vue的SSR模式开发，而Nuxt3就是Vue的SSR开发的框架。
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
export default Article
