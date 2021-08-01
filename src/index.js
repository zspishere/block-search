import React from 'react'
import ReactDOM from 'react-dom'
import MainFrame from './pages/main/Index'
import 'antd/dist/antd.css'
import '@ant-design/pro-list/dist/list.css'

ReactDOM.render(
  <React.StrictMode>
    <MainFrame />
  </React.StrictMode>,
  document.getElementById('root')
)
