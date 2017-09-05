import React, {Component} from 'react'
import MobileNewsHeader from './mobile_news_header'
import NewsFooter from './news_footer'
import {BackTop} from 'antd'
import 'antd/dist/antd.css'
import '../componentCss/pc.css'

export default class MobileApp extends Component{

  render(){
    return (
      <div>
        <MobileNewsHeader />
        {this.props.children}
        <NewsFooter />
        <div className="backTop">
          <BackTop />
        </div>
      </div>
    )
  }
}