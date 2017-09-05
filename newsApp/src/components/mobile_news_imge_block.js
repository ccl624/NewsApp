import React,{Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {Card} from 'antd'
import axios from 'axios'

export default class MobileNewsImageBlock extends Component{
  static propTypes = {
    type:PropTypes.string.isRequired,
    count:PropTypes.number.isRequired,
  }
  state = {
    newsArr:[]
  }
  componentDidMount(){
    const {type, count} = this.props
    axios.get(
      `http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`
    ).then((res) => {
      const newsArr = res.data
      this.state.newsArr = newsArr
      this.setState({
        newsArr
      })
    })
  }

  render(){

    const {newsArr} = this.state

    return (
      <div>
        {newsArr.map((item, index)=>(
            <Card key={index} className="m_article list-item special_section clearfix">
              <Link to={`/newsdetail/${item.uniquekey}`}>
                <div className="m_article_img">
                  <img src={item.thumbnail_pic_s} alt=""/>
                </div>
                <div className="m_article_info">
                  <div className="m_article_title">
                    <span>{item.title}</span>
                  </div>
                  <div className="m_article_desc clearfix">
                    <div className="m_article_desc_l">
                      <span className="m_article_channel">{item.realtype}</span>
                      <span className="m_article_time">{item.date}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </Card>
          ))}
      </div>
    )
  }
}