import React from 'react'
import {IndexRoute,Router,Route,hashHistory} from 'react-router'
import {render} from 'react-dom'
import MediaQuery from 'react-responsive'
import App from './components/App'
import NewsContainer from './components/news_container'
import UserCenter from './components/user_center'
import NewsDetail from "./components/news_detail"
import MobileApp from './components/mobile_app'
import MobileNewsContainer from './components/mobile_news_container'
import MobileNewsDetail from './components/mobile_news_detial'
import MobileUserCenter from './components/mobile_user_center'

render((

  <div>
    <MediaQuery query='(min-device-width: 1224px)'>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={NewsContainer}></IndexRoute>
          <Route path="/newscontainer" component={NewsContainer}></Route>
          <Route path="/newsdetail/:uniquekey" component={NewsDetail}></Route>
          <Route path="/usercenter" component={UserCenter}></Route>
        </Route>
      </Router>
    </MediaQuery>
    <MediaQuery query='(max-device-width: 1224px)'>
      <Router history={hashHistory}>
        <Route path="/" component={MobileApp}>
          <IndexRoute component={MobileNewsContainer}></IndexRoute>
          <Route path="/newscontainer" component={MobileNewsContainer}></Route>
          <Route path="/newsdetail/:uniquekey" component={MobileNewsDetail}></Route>
          <Route path="/usercenter" component={MobileUserCenter}></Route>
        </Route>
      </Router>
    </MediaQuery>
  </div>

),document.getElementById('root'))