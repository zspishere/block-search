import React, {useState} from 'react'
import { Input, Row, Col, Menu, Dropdown, Button, message } from 'antd'
import { DownOutlined, SearchOutlined } from '@ant-design/icons'
import {getRowBlockInfo} from '../../utils/axios'
import TransactionList from './TransactionList'
import BlockProfile from './BlockProfile'

const legalCurrencies = [
  "USD","CNY","HKD","TWD","AUD","CAD","CHF","DKK","EUR","JPY"
]

export default () => {
  const [blockInfo, setBlockInfo] = useState()
  const [legalCurrency, setLegalCurrency] = useState(legalCurrencies[0])

  const search = (e) => {
    getRowBlockInfo(e.target.value, (resp)=>{
      setBlockInfo(resp.data)
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

  const SearchBar = () => (
    <Row justify="space-between" align="middle">
      <Col>
        <Input size="large"
               style={{width: "620px"}}
               placeholder="Search your block"
               onPressEnter={search}
               prefix={<SearchOutlined />}
        />
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
      <Row justify="center" align="top">
        <Col span={20}>
          <div style={{margin: "20px 0"}}>
            <SearchBar/>
          </div>
          {blockInfo ?
          <div>
            <div style={{margin: "10px 30px"}}>
              <BlockProfile blockInfo={blockInfo} legalCurrency={legalCurrency}/>
            </div>
            <div style={{margin: "10px 0px"}}>
              <TransactionList txList={blockInfo.tx} blockHeight={blockInfo.height}/>
            </div>
          </div>
          :
          <div>
          </div>
          }
        </Col>
      </Row>
    </div>
  )
}
