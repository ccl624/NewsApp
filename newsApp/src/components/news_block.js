import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import axios from 'axios'
import {Card} from 'antd'
export default class NewsBlock extends Component{
  static propTypes = {
    type:PropTypes.string.isRequired,
    count:PropTypes.number.isRequired
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
    const newsArr = this.state.newsArr
    const newslist = !newsArr.length? (<h3>Loading</h3>)
      : (newsArr.map((item, index) => (
        <li key={index}>
          <Link to={`/newsdetail/${item.uniquekey}`}>{item.title}</Link>
        </li>
      )))
    return(
      <Card className="topNewsList" >
        <ul>
          {newslist}
        </ul>
      </Card>
    )
  }
}