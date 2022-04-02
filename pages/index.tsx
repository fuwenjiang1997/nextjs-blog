import type { NextPage } from 'next'
import React, { useState } from 'react'
import MainLayout from '../layout/MainLayout'
import HomeArticleCard from '../components/homeArticleCard/HomeArticleCard'
require('../styles/home.less')

const homePage: NextPage = () => {
  return (
    <MainLayout page="home">
      <div className="content-container">
        {[1, 2, 3, 4, 5, 6].map((item) => {
          return (
            <div key={item} style={{ marginBottom: '20px' }}>
              <HomeArticleCard title="你好"></HomeArticleCard>
            </div>
          )
        })}
      </div>
    </MainLayout>
  )
}

export default homePage
