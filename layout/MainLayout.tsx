import type { NextPage } from 'next'
import { Layout, Menu, Row, Col, Button } from 'antd'
import React, { useState } from 'react'
import Link from 'next/link'

const { Header, Content } = Layout
type propsType = {
  page: string
}

const MainLayout: NextPage<propsType> = ({ children, page }) => {
  return (
    <Layout>
      <Header className="main-header">
        <div className="logo" />
        <Row>
          <Col span={20}>
            <Menu mode="horizontal" defaultSelectedKeys={[page]}>
              <Menu.Item key="home">
                <Link href="/">首页</Link>
              </Menu.Item>
              <Menu.Item key="add-article">
                <Link href="/add-article">写文章</Link>
              </Menu.Item>
              <Menu.Item key="user">
                <Link href="/user">用户</Link>
              </Menu.Item>
            </Menu>
          </Col>
          <Col span={4}>
            <Button type="primary" shape="round">
              退出
            </Button>
          </Col>
        </Row>
      </Header>
      <Content className="main-content">{children}</Content>
    </Layout>
  )
}

export default MainLayout
