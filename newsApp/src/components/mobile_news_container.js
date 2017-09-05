import React, {Component} from 'react'
import {Carousel,Tabs} from 'antd'

import Carousel_1 from '../images/carousel_1.jpg'
import Carousel_2 from '../images/carousel_2.jpg'
import Carousel_3 from '../images/carousel_3.jpg'
import Carousel_4 from '../images/carousel_4.jpg'
import MobileNewsImageBlock from './mobile_news_imge_block'

const TabPane = Tabs.TabPane
export default class MobileNewsContainer extends Component{

  constructor(props) {
    super(props);
    this.state = {
      mode: 'top',
    };
  }

  render() {
    document.title = "首页"
    return (
      <Tabs defaultActiveKey="1">
        <TabPane tab="头条" key="1">
          <div style={{width:"100%"}}>
            <Carousel autoplay>
              <div>
                <img src={Carousel_1} alt=""/>
              </div>
              <div>
                <img src={Carousel_2} alt=""/>
              </div>
              <div>
                <img src={Carousel_3} alt=""/>
              </div>
              <div>
                <img src={Carousel_4} alt=""/>
              </div>
            </Carousel>
          </div>
          <MobileNewsImageBlock type="top"  count={20}></MobileNewsImageBlock>
        </TabPane>
        <TabPane tab="社会" key="2">
          <MobileNewsImageBlock type="shehui"  count={20}></MobileNewsImageBlock>
        </TabPane>
        <TabPane tab="国内" key="3">
          <MobileNewsImageBlock type="guonei"  count={20}></MobileNewsImageBlock>
        </TabPane>
        <TabPane tab="国际" key="4">
          <MobileNewsImageBlock type="guoji"  count={20}></MobileNewsImageBlock>
        </TabPane>
        <TabPane tab="娱乐" key="5">
          <MobileNewsImageBlock type="yule"  count={20}></MobileNewsImageBlock>
        </TabPane>
      </Tabs>

    )
  }
}