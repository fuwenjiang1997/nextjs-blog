import { prisma } from '../utils.server'
import superjson from 'superjson'

export const getUserArticle = async (userId: number) => {
  try {
    const article = await prisma.article.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createAt: 'desc',
      },
    })
    return superjson.serialize(article).json
  } catch (err) {
    return null
  }
}

export const getArticleListByPage = async ({ skip = 0, take = 4 }) => {
  const articleList = await prisma.article.findMany({
    skip: <number>skip * 1,
    take: <number>take * 1,
  })

  return superjson.serialize(articleList).json
}

export const getArticleById = async (id: number) => {
  const article = await prisma.article.findUnique({
    where: {
      id: Number(id),
    },
  })

  return superjson.serialize(article).json
}
