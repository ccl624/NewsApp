import React, {Component} from 'react'
import {Col,Card,Tabs,Form,Input,Button,message} from 'antd'
import axios from 'axios'

const TabPane = Tabs.TabPane
const FormItem = Form.Item
class MobileNewsDetail extends Component{
  state={
    pagecontent:[],
    comments:[]
  }
  componentWillReceiveProps(){
    const {uniquekey} =this.props.params
    this.getNews(uniquekey)
  }
  componentDidMount(){
    const {uniquekey} =this.props.params
    this.getNews(uniquekey)
  }

  getNews = (uniquekey) => {
    axios.get(`http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${uniquekey}`)
      .then(res => {
        const {pagecontent} = res.data
        this.setState({
          pagecontent
        })
        document.title = res.data.title
      })
    this.updateComment(uniquekey)
  }
  updateComment = (uniquekey)=>{
    axios.get(`http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=${uniquekey}`)
      .then(res => {
        const comments = res.data
        //console.log(comments);
        this.setState({
          comments
        })
      })
  }

  handleSubmit = (e) => {
    const {uniquekey} =this.props.params
    const userId = localStorage.getItem('userId')
    if(!userId){
      message.info("请先登录")
      return
    }
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if(!values.comment || values.comment.trim()===''){
          message.info('评论不能为空~~~')
        }else{
          axios.get(`http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=${userId}&uniquekey=${uniquekey}&commnet=${values.comment}`)
            .then(res => {
              //const comments = this.state.comments.push()
              message.info('提交评论成功~~~')
              this.updateComment(uniquekey)
              this.props.form.resetFields()
            })
        }
      }
    });
  }

  //收藏文章
  collectArticle = () => {
    const {uniquekey} =this.props.params
    const userId = localStorage.getItem('userId')
    if(!userId){
      message.info("请先登录")
      return
    }
    axios.get(`http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=${userId}&uniquekey=${uniquekey}`)
      .then(res => {
        message.info('收藏文章成功~~~')
      })
  }



  render(){

    const {getFieldDecorator} = this.props.form
    const {pagecontent, comments} = this.state
    const commentList = !comments.length ? (
      <h3>还没有任何评论~~</h3>
    ):(comments.map((item, index)=>(
      <Card title={item.UserName} key={index}>
        <p>{item.Comments}</p>
      </Card>
    )))
    return (
      <div style={{padding:"10px"}}>
          <div dangerouslySetInnerHTML={{__html:pagecontent}}></div>
          <Tabs>
            <TabPane tab="评论区" key="1">{commentList}</TabPane>
          </Tabs>
          <Form onSubmit={this.handleSubmit}>
            <FormItem label="您的评论">
              {getFieldDecorator('comment')(
                <Input type="textarea" placeholder="随便写点什么~~" />
              )}
            </FormItem>
            <Button type="primary" htmlType="submit">提交评论</Button>&nbsp;&nbsp;
            <Button type="primary" onClick={this.collectArticle}>收藏该文章</Button>
          </Form>
        <Col span={1}></Col>
      </div>
    )
  }
}

export default Form.create()(MobileNewsDetail)