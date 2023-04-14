import { AppRegistry } from 'react-native'
import App from './App'
// import Login from './src/Pages/登录注册/Login'
// import Home from './src/Pages/首页/Home'

AppRegistry.registerComponent('baijiPro', () => App)
AppRegistry.runApplication('baijiPro', {
  initialProps: {},
  rootTag: document.getElementById('app-root')
})
