import { prisma, apiHandler } from '../../utils.server'
import bcrypt from 'bcrypt'
import Boom from '@hapi/boom'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'

type LoginForm = {
  email: string
  password: string
}

async function validate(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })
  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw Boom.unauthorized('username or password not correct')
  }
  return user
}

export default apiHandler().post(async (req, res) => {
  const body = <LoginForm>req.body
  await validate(body.email, body.password)

  const token = jwt.sign(
    {
      email: body.email,
    },
    <string>process.env.JWT_SECRET,
    { expiresIn: '3 days' }
  )

  res.setHeader(
    'Set-Cookie',
    cookie.serialize('token', token, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 3,
    })
  )
  res.json({})
})
