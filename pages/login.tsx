import type { NextPage } from 'next'
import { Form, Input, Button, Checkbox, Row, Col } from 'antd'
import { ChangeEvent, useState } from 'react'
import { useMutation } from 'react-query'
import Link from 'next/link'
import axios from 'axios'
import Router from 'next/router'
import style from '../styles/login.module.css'

const loginPage: NextPage = () => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  function changeUserName(event: ChangeEvent<HTMLInputElement>) {
    setUserName(event.target.value)
  }

  function changePassword(event: ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value)
  }

  async function loginFetch({
    userName,
    password,
  }: {
    userName: string
    password: string
  }) {
    await axios.post('api/login', {
      email: userName,
      password: password,
    })
  }

  const loginMutation = useMutation(loginFetch, {
    onSuccess() {
      Router.push({ pathname: '/page/1' })
    },
    onError(err) {
      alert(`err: ${err}`)
    },
  })

  function onFinish() {
    loginMutation.mutate({ userName, password })
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
        <h2 className={style.title}>login page</h2>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input value={userName} onChange={changeUserName} />
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
          <Row gutter={24}>
            <Col className="gutter-row" span={12}>
              <Link href="/register">
                <Button htmlType="button">to Register</Button>
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

export default loginPage
