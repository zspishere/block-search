import React, {useState} from 'react'
import { Input, Row, Col, Menu, Dropdown, Button, BackTop, message, notification } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import {getRowBlockInfo} from '../../utils/axios'
import TransactionList from './TransactionList'
import BlockProfile from './BlockProfile'

const legalCurrencies = [
  "USD","CNY","HKD","TWD","AUD","CAD","CHF","DKK","EUR","JPY"
]

export default () => {
  const [blockInfo, setBlockInfo] = useState()
  const [legalCurrency, setLegalCurrency] = useState(legalCurrencies[0])
  const [loading, setLoading] = useState(false)

  const search = (value, _) => {
    setLoading(true)
    getRowBlockInfo(value, (err, resp)=>{
      if (err) {
        notification.error({
          message: 'Block Search Error',
          description: `Block ${value} is Not Found`,
        })
      } else {
        setBlockInfo(resp.data)
      }
      setLoading(false)
    })
  }

  const handleMenuClick = (e) => {
    message.info(`Change legal currency type to ${e.key}`)
    setLegalCurrency(e.key)
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      {
        legalCurrencies.map(item =>
          <Menu.Item key={item}>{item}</Menu.Item>)
      }
    </Menu>
  )

  const SearchInput = () => (
    <Input.Search size="large"
                  style={{width: "100%"}}
                  placeholder="Search your block here"
                  onSearch={search}
                  loading={loading}/>
  )

  const SearchBar = () => (
    <Row justify="space-between" align="middle">
      <Col span={10}>
        <SearchInput />
      </Col>
      <Col>
        <Dropdown overlay={menu}>
          <Button size="large">
            {legalCurrency} <DownOutlined />
          </Button>
        </Dropdown>
      </Col>
    </Row>
  )

  return (
    <div>
      {blockInfo ?
      <Row justify="center" align="top">
        <Col span={20}>
          <div>
            <BackTop visibilityHeight={100}/>
            <div style={{margin: "20px 0", position: "sticky", top: "0px"}}>
              <SearchBar/>
            </div>
            <div style={{margin: "10px 30px"}}>
              <BlockProfile blockInfo={blockInfo} legalCurrency={legalCurrency}/>
            </div>
            <div style={{margin: "10px 0px"}}>
              <TransactionList txList={blockInfo.tx} blockHeight={blockInfo.height}/>
            </div>
          </div>
        </Col>
      </Row>
      :
      <Row>
        <Col span={10} offset={7}>
          <div style={{margin: "20% 0"}}>
            <p style={{textAlign: "center", fontSize: "40px"}}>Block Search</p>
            <SearchInput />
          </div>
        </Col>
      </Row>
      }
    </div>
  )
}
