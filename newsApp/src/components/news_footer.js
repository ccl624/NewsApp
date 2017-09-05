import React, {Component} from 'react'
import {Row, Col} from 'antd'



export default class NewsFooter extends Component{

  render(){
    const rightStyle = {
      "textAlign": "center",
        "padding": "20px"
    }
    return (
      <Row>
        <Col span={1}></Col>
        <Col span={22} style={rightStyle}>2017 ReactNews. All Right Reserved.</Col>
        <Col span={1}></Col>
      </Row>
    )
  }
}