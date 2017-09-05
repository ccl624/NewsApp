import React, {Component} from 'react'
import {Tabs,Card,Upload, Icon, Modal} from 'antd'
import axios from 'axios'
import {Link} from 'react-router'


const TabPane = Tabs.TabPane
export default class MobileUserCenter extends Component{

  state = {
    uc:[],
    UserId:null,
    comments:[],
    previewVisible: false,
    previewImage: '',
    fileList: [{
      uid: -1,
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    }],
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({ fileList }) => this.setState({ fileList })

  componentDidMount(){
    const UserId = localStorage.getItem('userId')

    axios.get(`http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=${UserId}`)
      .then(res => {
        const uc = res.data
        this.setState({uc})
      })

    axios.get(`http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=${UserId}`)
      .then(res => {
        const comments = res.data
        this.setState({comments})
      })
    document.title = "用户中心"
  }

  render() {

    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );


    const {uc,comments} = this.state
    const ucList = !uc.length ? (
      <h3>没有任何收藏</h3>
    ):(
      uc.map((item, index) => (
        <Card key={index} title={item.uniquekey} extra={<Link to={`/newsdetail/${item.uniquekey}`}>查看</Link>}>
          <p>{item.Title}</p>
        </Card>
      ))
    )

    const commentList = !comments.length ?(
      <h3>没有任何评论</h3>
    ):(
      comments.map((item, index) => (
        <Card key={index} title={`于${item.datetime}评论了文章：${item.uniquekey}`} extra={<Link to={`/newsdetail/${item.uniquekey}`}>查看</Link>}>
          <p>{item.Comments}</p>
        </Card>
      ))
    )

    return (
      <div>
        <Tabs defaultActiveKey="1">
          <TabPane tab="我的收藏列表" key="1" style={{padding:"10px"}}>
            {ucList}
          </TabPane>
          <TabPane tab="我的评论列表" key="2" style={{padding:"10px"}}>
            {commentList}
          </TabPane>
          <TabPane tab="头像设置" key="3" style={{padding:"10px"}}>
            <div className="clearfix">
              <Upload
                action="//jsonplaceholder.typicode.com/posts/"
                listType="picture-card"
                fileList={fileList}
                onPreview={this.handlePreview}
                onChange={this.handleChange}
              >
                {fileList.length >= 3 ? null : uploadButton}
              </Upload>
              <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
              </Modal>
            </div>
          </TabPane>
        </Tabs>
      </div>
    )
  }
}