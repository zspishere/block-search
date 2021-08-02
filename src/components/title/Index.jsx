/* eslint-disable import/no-anonymous-default-export */
import React from 'react'
import { Tooltip, Space } from 'antd'
import { InfoCircleFilled } from '@ant-design/icons'

export default ({title, tip}) => (
  <Space align="center">
    <span style={{fontSize: "25px"}}>
      {title}
    </span>
    <Tooltip title={tip} placement="right" mouseEnterDelay={0.01}>
      <InfoCircleFilled style={{color: "gray"}}/>
    </Tooltip>
  </Space>
)
