import React, {Component} from 'react'
import {
  Row,
  Col,
  Menu,
  Icon,
  Button,
  Modal,
  Tabs,
  Form,
  Input,
  message
} from 'antd'
import {Link} from 'react-router'
import logo from '../images/logo.png'
import axios from 'axios'

const TabPane = Tabs.TabPane
const FormItem = Form.Item


class NewsHeader extends Component{

  state = {
    visible: false,
    userName:null,
  }

  componentDidMount(){
    const userName = localStorage.getItem('username')
    if(userName) {
      this.setState({userName})
    }
  }

  showModal = ({key}) => {
    if(key === "loginOrout"){
      let {visible} = this.state
      visible = true
      this.setState({
        visible
      });
    }
  }

  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }
  //切换对话框标签
  tabChange = () => {
    this.props.form.resetFields()
  }

  handleLogout = () => {
    localStorage.removeItem('userId')
    localStorage.removeItem('username')
    this.setState({
      userName:null,
      visible: false,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
    const formlist = this.props.form.getFieldsValue()
    console.log(formlist);
    const {userName,password,r_userName,r_password,r_confirmPassword} = formlist
    if(userName&&password){
      axios.get(`http://newsapi.gugujiankong.com/Handler.ashx?action=login&username=${userName}&password=${password}`)
        .then((res)=>{
          if(res.data){
            this.setState({
              userName:res.data.NickUserName,
              visible:false
            })
            message.info("登录成功");
            const {UserId} = res.data
            const {NickUserName} = res.data
            localStorage.setItem('userId', UserId)
            localStorage.setItem('username', NickUserName)
          }else {
            message.info("登录失败");
          }
        })
    }else if(r_userName&& r_password&& r_confirmPassword&& r_password===r_confirmPassword){
      axios.get(`http://newsapi.gugujiankong.com/Handler.ashx?action=register&r_userName=${r_userName}&r_password=${r_password}&r_confirmPassword=${r_confirmPassword}`)
        .then((res)=>{
          if(res.data){
            message.info("注册成功");
            this.setState({
              visible:false
            })
          }else {
            message.info("注册失败");
          }
        })
    }else{
      message.info("内容不能为空~~~");
    }
  }


  render(){
    const { getFieldDecorator, getFieldError, isFieldTouched } = this.props.form
    const userNameError = isFieldTouched('userName') && getFieldError('userName')
    const passwordError = isFieldTouched('password') && getFieldError('password')

    const {userName} = this.state
    const userStatus = !userName? (
      <Menu.Item key="loginOrout" className="register">
        <Icon type="appstore" />
        <span>登录/注册</span>
      </Menu.Item>
    ):(
      <Menu.Item key="register" className="register">
          <Button type="primary">{userName}</Button>&nbsp;&nbsp;
          <Link to="/usercenter">
            <Button type="dashed">个人中心</Button>
          </Link>&nbsp;&nbsp;
          <Button onClick={this.handleLogout}>退出</Button>
      </Menu.Item>
    )


    return (
      <div>
        <Row>
          <Col span={1}></Col>
          <Col span={3}>
            <a href="#/" className="logo">
              <img src={logo} alt="logo"/>
              <span>ReactNews</span>
            </a>
          </Col>
          <Col span={19}>
            <Menu mode="horizontal"
                  defaultSelectedKeys={['top']}
                  onClick={this.showModal}
            >
              <Menu.Item key="top">
                <Icon type="appstore" />
                <span>头条</span>
              </Menu.Item>
              <Menu.Item key="shehui">
                <Icon type="appstore" />
                <span>社会</span>
              </Menu.Item>
              <Menu.Item key="guoji">
                <Icon type="appstore" />
                <span>国际</span>
              </Menu.Item>
              <Menu.Item key="guonei">
                <Icon type="appstore" />
                <span>国内</span>
              </Menu.Item>
              <Menu.Item key="yule">
                <Icon type="appstore" />
                <span>娱乐</span>
              </Menu.Item>
              <Menu.Item key="tiyu">
                <Icon type="appstore" />
                <span>体育</span>
              </Menu.Item>
              <Menu.Item key="keji">
                <Icon type="appstore" />
                <span>科技</span>
              </Menu.Item>
              <Menu.Item key="shishang">
                <Icon type="appstore" />
                <span>时尚</span>
              </Menu.Item>
              {userStatus}

            </Menu>
            <Modal
              title="用户中心"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              <Tabs defaultActiveKey="login" onChange={this.tabChange} type="card">
                <TabPane tab="登录" key="login">
                  <Form onSubmit={this.handleSubmit}>
                    <FormItem
                      label="用户名"
                      validateStatus={userNameError ? 'error' : ''}
                      help={userNameError || ''}
                    >
                      {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                      })(
                        <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="请输入用户名" />
                      )}
                    </FormItem>
                    <FormItem label="密码" validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
                      {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                      })(
                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="请输入密码" />
                      )}
                    </FormItem>
                    <FormItem>
                      <Button type="primary" htmlType="submit">登录</Button>
                    </FormItem>
                  </Form>
                </TabPane>
                <TabPane tab="注册" key="register">
                  <Form onSubmit={this.handleSubmit}>
                    <FormItem
                      label="用户名"
                      validateStatus={userNameError ? 'error' : ''}
                      help={userNameError || ''}
                    >
                      {getFieldDecorator('r_userName', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                      })(
                        <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="请输入用户名" />
                      )}
                    </FormItem>
                    <FormItem
                      label="密码"
                      validateStatus={passwordError ? 'error' : ''}
                      help={passwordError || ''}
                    >
                      {getFieldDecorator('r_password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                      })(
                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="请输入密码" />
                      )}
                    </FormItem>
                    <FormItem label="确认密码" validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
                      {getFieldDecorator('r_confirmPassword', {
                        rules: [{ required: true, message: 'Please confirm your Password!' }],
                      })(
                        <Input type="confirmPassword" placeholder="请输入确认密码" />
                      )}
                    </FormItem>
                    <FormItem>
                      <Button type="primary" htmlType="submit">
                        注册
                      </Button>
                    </FormItem>
                  </Form>
                </TabPane>
              </Tabs>
            </Modal>
          </Col>
          <Col span={1}></Col>
        </Row>
      </div>
    )
  }
}

export default Form.create()(NewsHeader)