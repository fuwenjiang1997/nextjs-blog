import Boom from '@hapi/boom'
import { prisma, apiHandler, authMiddleware } from '../../utils.server'
import { User } from '@prisma/client'

type ArticleForm = {
  title: string
  content: string
  user: User
}

export default apiHandler().post(authMiddleware(), async (req, res) => {
  if (!req.user) {
    throw Boom.unauthorized('请先登录')
  }
  const body = <ArticleForm>req.body

  await prisma.article.create({
    data: {
      title: body.title,
      content: body.content,
      userId: req.user.id,
    },
  })

  res.json({})
})
