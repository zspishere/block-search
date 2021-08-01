import React from 'react'
import { Tag, Row, Col, Space, message } from 'antd'
import { ArrowRightOutlined, GlobalOutlined } from '@ant-design/icons'
import ProList from '@ant-design/pro-list'
import moment from 'moment'
import CommonTitle from '../../components/title/Index'

const WalletAmount = ({addr, amount, txHash, isOutput}) => (
  <Space size={20} align="top">
    <span style={{textOverflow: "ellipsis", width: "300px", overflow: "hidden",
                  display: "inline-block", whiteSpace: "nowrap"}}>
      <a href={`https://www.blockchain.com/btc/address/${addr}`}>{addr}</a>
    </span>
    <Space>
      <span>{amount}</span>
      <a href={`https://www.blockchain.com/btc/tx/${txHash}`} title={isOutput?"Output":"Spent"}>
        <GlobalOutlined style={{color: isOutput?"blue":"red"}}/>
      </a>
    </Space>
  </Space>
)

export default (props) => {
  const calculateFee = (outs) => {
    let total = 0
    total = outs.reduce((total, item)=>total+item.value, 0)
    return total
  }

  return (
    <ProList
      toolBarRender={() => {
        return [
          // <Button>上一页</Button>,
          // <Button>下一页</Button>,
        ];
      }}
      itemLayout="vertical"
      rowKey="hash"
      headerTitle={
        <CommonTitle title="Block Transactions"
          tip={`All transactions recorded in Block at height ${props.blockHeight}`}/>
      }
      dataSource={props.txList}
      split={true}
      pagination={{
        pageSize: 5,
      }}
      metas={{
        content: {
          render: (_, row) => {
            return (
              <div>
                <Row align="middle">
                  <Col span={2}>
                    <span>Hash</span>
                  </Col>
                  <Col span={8}>
                    <a href={`https://www.blockchain.com/btc/tx/${row.hash}`}>
                      <span>{row.hash}</span>
                    </a>
                  </Col>
                  <Col span={4} offset={10} style={{textAlign: "right"}}>
                    <span>{moment(parseInt(row.time)*1000).format('YYYY-MM-DD HH:mm Z')}</span>
                  </Col>
                </Row>

                <Row align="middle" style={{textAlign: "left"}}>
                  <Col span={8} offset={2}>
                    {
                      row.inputs.map((item)=>(
                        item.prev_out ?
                        <WalletAmount key={item.prev_out.addr} addr={item.prev_out.addr}
                          amount={parseFloat(item.prev_out.value*0.00000001).toFixed(8) + " BTC"}
                          txHash="075a8e2c7c0d0a12cdaaa21d1ee5be61fa8a18d8888297543141bbcbfb282a6b" // TODO
                          isOutput/> :
                        "COINBASE (Newly generated coins)"
                      ))
                    }
                  </Col>
                  <Col span={6} style={{textAlign: "center"}}>
                    <ArrowRightOutlined style={{color: "green", fontSize: "20px"}}/>
                  </Col>
                  <Col span={8} style={{textAlign: "right"}}>
                    {
                      row.out.map((item)=>(
                        <WalletAmount key={item.addr} addr={item.addr}
                          amount={parseFloat(item.value*0.00000001).toFixed(8) + " BTC"}
                          txHash="075a8e2c7c0d0a12cdaaa21d1ee5be61fa8a18d8888297543141bbcbfb282a6b" // TODO
                          isOutput={false}/>
                      ))
                    }
                  </Col>
                </Row>
                
                <Row align="middle">
                  <Col span={2}>
                    <span>Fee</span>
                  </Col>
                  <Col span={20}>
                    <div>{parseFloat(row.fee*0.00000001).toFixed(8) + " BTC"}</div>
                    <div>(xx sat/B - xx sat/WU - {row.size} bytes)</div>
                  </Col>
                  <Col span={2} style={{textAlign: "right"}}>
                    <Tag color="green" style={{cursor: "pointer"}} onClick={()=>{
                      message.warning('To be completed.')}}>
                      {parseFloat(calculateFee(row.out)*0.00000001).toFixed(8) + " BTC"}
                    </Tag>
                  </Col>
                </Row>
              </div>
            )
          },
        },
      }}
    />
  )
}
