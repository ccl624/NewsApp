import React,{Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {Card} from 'antd'
import axios from 'axios'

export default class NewsImageBlock extends Component{
  static propTypes = {
    type:PropTypes.string.isRequired,
    count:PropTypes.number.isRequired,
    cardTitle: React.PropTypes.string.isRequired, // card名称
    cardWidth: React.PropTypes.string.isRequired, // card宽度
    imageWidth: React.PropTypes.string.isRequired, // 图片宽度
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
      this.setState({
        newsArr
      })
    })
  }

  render(){
    const {imageWidth,cardWidth,cardTitle} = this.props
    const imgStyle = {
      "width": imageWidth,
      "height": "90px",
      "display": "block"
    }
    const titleStyle = {
        "width": imageWidth,
        "whiteSpace": "nowrap",
        "overflow": "hidden",
        "textOverflow": "ellipsis"
      }

    const {newsArr} = this.state

    return (
      <Card title={cardTitle} className="topNewsList" style={{width:cardWidth}}>
        {newsArr.map((item, index)=>(
          <div key={index} className="imageblock">
            <Link to={`/newsdetail/${item.uniquekey}`}>
              <div>
                <img src={item.thumbnail_pic_s} style={imgStyle} alt=""/>
              </div>
              <div className="custom-card">
                <h3 style={titleStyle}>{item.title}</h3>
                <p>{item.author_name}</p>
              </div>
            </Link>
          </div>
        ))}

      </Card>
    )
  }
}