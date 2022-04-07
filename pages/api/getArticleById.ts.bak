import { prisma, apiHandler } from '../../utils.server'

export default apiHandler().get(async (req, res) => {
  const id = req.query.id as string
  const article = await prisma.article.findUnique({
    where: {
      id: Number(id),
    },
  })
  res.json({
    data: article,
  })
})
