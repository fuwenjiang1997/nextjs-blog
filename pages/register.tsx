import type { NextPage } from 'next'
import { Form, Input, Button, Checkbox, Row, Col } from 'antd'
import { ChangeEvent, useState } from 'react'
import { useMutation } from 'react-query'
import axios from 'axios'
import Router from 'next/router'
import Link from 'next/link'
import style from '../styles/login.module.css'

const registerPage: NextPage = () => {
  const [uesrName, setUesrName] = useState('')
  const [password, setPassword] = useState('')

  function changeUserName(event: ChangeEvent<HTMLInputElement>) {
    setUesrName(event.target.value)
  }

  function changePassword(event: ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value)
  }

  async function registerAction({
    email,
    password,
  }: {
    email: string
    password: string
  }) {
    await axios.post('api/register', {
      email: email,
      password: password,
    })
  }

  const registerMutation = useMutation(registerAction, {
    onSuccess() {
      Router.push({ pathname: '/login' })
    },
    onError(err) {
      alert(`err: ${err}`)
    },
  })

  async function onFinish() {
    registerMutation.mutate({ email: uesrName, password })
  }
  function onFinishFailed() {}

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
        <h2 className={style.title}>register page</h2>
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

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Row gutter={24}>
            <Col className="gutter-row" span={12}>
              <Link href="/login">
                <Button htmlType="button">to Login</Button>
              </Link>
            </Col>
            <Col className="gutter-row" span={12}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </div>
  )
}

export default registerPage
