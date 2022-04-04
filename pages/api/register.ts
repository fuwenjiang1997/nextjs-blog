import { prisma, apiHandler } from '../../utils.server'
import bcrypt from 'bcrypt'

type RegisterForm = {
  email: string
  password: string
}

export default apiHandler().post(async (req, res) => {
  const body = <RegisterForm>req.body
  const { email, password } = body
  const user = await prisma.user.create({
    data: {
      name: email,
      email: email,
      password: bcrypt.hashSync(password, 10),
    },
  })
  if (user) {
    res.json({
      message: 'success',
    })
  }
})
