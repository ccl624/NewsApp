import React, {Component} from 'react'
import {Row, Col, Carousel, Tabs} from 'antd'

import Carousel_1 from '../images/carousel_1.jpg'
import Carousel_2 from '../images/carousel_2.jpg'
import Carousel_3 from '../images/carousel_3.jpg'
import Carousel_4 from '../images/carousel_4.jpg'
import NewsBlock from './news_block'
import NewsImageBlock from './news_image_block'
import NewsProducts from './news_products'


const TabPane = Tabs.TabPane
export default class NewsContainer extends Component{

  render() {
    document.title = "首页"
    return (
      <Row className="container">
        <Col span={1}></Col>
        <Col span={22}>
          <div className="leftContainer" style={{width:"35%"}}>
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
            <NewsImageBlock type="guoji" count={6} imageWidth="112px" cardWidth="400px" cardTitle="国际新闻"></NewsImageBlock>
          </div>

          <Tabs defaultActiveKey="top" className="tabs_news" style={{width:"35%"}}>
            <TabPane tab="头条新闻" key="top">
              <NewsBlock type="top" count={21}></NewsBlock>
            </TabPane>
            <TabPane tab="国际新闻" key="guoji">
              <NewsBlock type="guoji" count={21}></NewsBlock>
            </TabPane>
          </Tabs>
          <Tabs defaultActiveKey="1" className="tabs_product" style={{width:"30%"}}>
            <TabPane tab="React News产品" key="1">
              <NewsProducts></NewsProducts>
            </TabPane>
          </Tabs>
          <NewsImageBlock type="guoji" count={8} imageWidth="112px" cardWidth="100%" cardTitle="国际新闻"></NewsImageBlock>
          <NewsImageBlock type="yule" count={20} imageWidth="112px" cardWidth="100%" cardTitle="娱乐新闻"></NewsImageBlock>
        </Col>
        <Col span={1}></Col>
      </Row>
    )
  }
}