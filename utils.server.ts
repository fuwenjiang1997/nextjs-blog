import nc from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
import * as Boom from '@hapi/boom'
// import cors, { CorsOptions } from 'cors'

export const prisma: PrismaClient = (global as any).prisma || new PrismaClient()
if (process.env.NODE_ENV !== 'production') (global as any).prisma = prisma

export const authMiddleware = () => async (req: any, res: any, next: any) => {
  const user = await getUserFromReq(req)
  if (!user) {
    throw Boom.unauthorized('Please login first')
  } else {
    req.user = user
    next()
  }
}

// const corsOpitons: CorsOptions = {
//   origin: 'http://localhost:3000',
//   optionsSuccessStatus: 200,
// }
export const apiHandler = () =>
  nc<NextApiRequest, NextApiResponse>({
    onError(err, req, res) {
      if (Boom.isBoom(err)) {
        res.status(err.output.payload.statusCode)
        res.json({
          error: err.output.payload.error,
          message: err.output.payload.message,
        })
      } else {
        res.status(500)
        res.json({
          message: 'Unexpected error',
        })
      }
    },
  })

type tokenForm = {
  email?: string
}
export const getUserFromReq = async (req: any) => {
  const token = req.cookies['token']
  try {
    const payload = <tokenForm>jwt.verify(token, <string>process.env.JWT_SECRET)
    const user = await prisma.user.findUnique({
      where: {
        email: payload.email,
      },
    })
    return user
  } catch (err) {
    return null
  }
}
