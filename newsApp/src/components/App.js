import React, {Component} from 'react'
import NewsHeader from './news_header'
import NewsFooter from './news_footer'
import {BackTop} from 'antd'

import 'antd/dist/antd.css'
import '../componentCss/pc.css'
import '../componentCss/mobile.css'

export default class App extends Component{

  render(){
    return (
        <div>
          <NewsHeader />
          {this.props.children}
          <NewsFooter />
          <div>
            <BackTop />
          </div>
        </div>
    )
  }
}