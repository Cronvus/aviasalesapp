import React from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { Flex, Spin } from 'antd'
import './LoadingSpin.scss'

export const LoadingSpin: React.FC = () => (
  <Flex align="center" gap="middle">
    <Spin className='spin'  indicator={<LoadingOutlined style={{ fontSize: 150 }} spin />} />
  </Flex>
)
