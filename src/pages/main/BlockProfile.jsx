import React, {useState} from 'react'
import { Descriptions, Tooltip, message, Radio, Row, Col } from 'antd'
import moment from 'moment'
import {numFormat} from '../../utils/common'
import CommonTitle from '../../components/title/Index'

const blockHeaders = [
  {
    label: "Hash",
    description: "Unique identifier used to identify a particular block",
    key: "hash"
  },
  {
    label: "Confirmations"
  },
  {
    label: "Timestamp",
    key: info => moment(parseInt(info.time)*1000).format('YYYY-MM-DD HH:mm Z')  // new Date(parseInt(info.time) * 1000).toLocaleString()
  },
  {
    label: "Height",
    description: "Number of blocks connected on the blockchain",
    key: info => numFormat(info.height)
  },
  {
    label: "Miner",
    description: "Who confirmed the transactions in the block",
    key: info => <a href={`https://www.blockchain.com/btc/address/${info.tx[0].out[0].addr}`}>Poolin</a>
  },
  {
    label: "Number of Transactions",
    description: "Number of transactions included in this block",
    key: info => info.tx.length
  },
  {
    label: "Difficulty",
    description: "Mathematical value of how hard it is to find a valid hash for this block"
  },
  {
    label: "Merkle root",
    description: "The root node of a merkle tree, a descendant of all the hashed pairs in the tree",
    key: "mrkl_root",
  },
  {
    label: "Version",
    description: "Block version related to protocol proposals underway",
    key: info => "0x" + info.ver?.toString(16)
  },
  {
    label: "Bits",
    description: "A sub-unit of BTC, equal to 0.000001 BTC",
    key: info => numFormat(info.bits)
  },
  {
    label: "Weight",
    description: "A measurement to compare the size of different transactions to each other in proportion to the block size limit",
    key: info => numFormat(info.weight) + " WU"
  },
  {
    label: "Size",
    description: "Total size of the block",
    key: info => numFormat(info.size) + " bytes"
  },
  {
    label: "Nonce",
    description: "Random value that can be adjusted to satisfy the proof of work",
    key: info => numFormat(info.nonce)
  },
  {
    label: "Transaction Volume",
    description: "Estimated total amount transacted in this block"
  },
  {
    label: "Block Reward",
    description: "Static reward for the miner who calculated the hash for this block"
  },
  {
    label: "Fee Reward",
    description: "Amount of transaction fees rewarded to the miner for calculating the hash for this block",
    key: info => parseFloat(info.fee*0.00000001).toFixed(8) + " BTC"
  },
]

export default ({blockInfo, legalCurrency}) => {
  const getMinerAddr = () => 
    `https://www.blockchain.com/btc/address/${blockInfo?.tx[0].out[0].addr}`
  
  const changeCurrency = (e) => {
    message.info(`Change currency type to ${e.target.value}`)
  }

  const HeaderTitle = () => {
    return (
      <div>
        <Row justify="space-between" align="middle">
          <Col>
            <CommonTitle title={"Block " + blockInfo?.height || ""}
              tip={`Block at height ${blockInfo?.height || ""} in the Bitcoin blockchain`}/>
          </Col>

          <Col>
            <Radio.Group onChange={changeCurrency} defaultValue="BTC" buttonStyle="solid" size="middle">
              <Radio.Button value={legalCurrency}>{legalCurrency}</Radio.Button>
              <Radio.Button value="BTC">BTC</Radio.Button>
            </Radio.Group>
          </Col>
        </Row>

        <div style={{marginTop: "5px"}}>
          <p>
            This block was mined on {moment(parseInt(blockInfo.time)*1000).format()} by <a href={getMinerAddr()}>Poolin</a>.
            It currently has XXX confirmations on the Bitcoin blockchain.
          </p>
          <p>
            The miner(s) of this block earned a total reward of YYY BTC ($XXX).
            The reward consisted of a base reward of YYY BTC ($XXX) with an additional {parseFloat(blockInfo.fee*0.00000001).toFixed(8)} BTC reward paid as fees of the {blockInfo.tx.length} transactions which were included in the block.
            The Block rewards, also known as the Coinbase reward, were sent to this <a href={getMinerAddr()}>address</a>.
          </p>
          <p>
            A total of XXX BTC ($XXX) were sent in the block with the average transaction being XXX BTC ($YYY).
            Learn more about how blocks work.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <HeaderTitle />
      <Descriptions title={false}
                    labelStyle={{width: 300}}
                    size="middle"
                    bordered
                    column={1}>
        {
          blockHeaders.map(header => (
            <Descriptions.Item
              key={header.label}
              label={
                <Tooltip title={header?.description || false}
                          placement="top"
                        //  overlayInnerStyle={{width: "100%"}}
                          mouseEnterDelay={0.01}
                          mouseLeaveDelay={0.1}>
                  <div>{header.label}</div>
                </Tooltip>
            }>
              {
                typeof header?.key === "string" ?
                (blockInfo ? blockInfo[header.key] : "") :
                (
                  typeof header?.key === "function" ?
                  (blockInfo ? header.key(blockInfo) : "") :
                  (typeof header?.key === "undefined" ? "Not Implemented" : "Not Supported")
                )
              }
            </Descriptions.Item>
          ))
        }
      </Descriptions>
    </div>
  )
}
