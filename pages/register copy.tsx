import type { NextPage } from 'next'
import { Form, Input, Button, Checkbox } from 'antd'
import { ChangeEvent, useState } from 'react'
import style from '../styles/Register.module.css'

const Register: NextPage = () => {
  const [uesrName, setUesrName] = useState('')
  const [password, setPassword] = useState('')

  function changeUserName(event: ChangeEvent<HTMLInputElement>) {
    setUesrName(event.target.value)
  }

  function changePassword(event: ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value)
  }

  function onFinish() {
    console.log(123)
  }
  function onFinishFailed() {}
  function toLoginPage() {}

  return (
    <div className={style.registerPage}>
      <Form
        className="register-form"
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input value={uesrName} onChange={changeUserName} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password value={password} onChange={changePassword} />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>

          <Button
            className={style.toLoginBtn}
            htmlType="button"
            onClick={toLoginPage}
          >
            to login
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Register
