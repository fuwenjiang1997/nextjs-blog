import { prisma, apiHandler } from '../../utils.server'

export default apiHandler().get(async (req, res) => {
  const { skip = 0, take = 4 } = req.query

  const articleList = await prisma.article.findMany({
    skip: <number>skip * 1,
    take: <number>take * 1,
  })
  res.json({
    data: articleList,
  })
})
