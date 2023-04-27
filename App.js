//import 'react-native-gesture-handler'
import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { Button, Provider, Toast } from '@ant-design/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/view/index'
import MinIndex from './src/view/mineIndex'
//import Index from './src/view/index1'

function HomeScreen({navigation}){
  return (<View>
    <Button title="首页" onPress={()=>navigation.navigate('Home')}></Button>
  </View>)
}
function MineScreen(prop){
  return (<View>
    <Text>个人中心页面</Text>
  </View>)
}
const Stack = createNativeStackNavigator()
export default class App extends Component {
  
  render() {
    return (
      <Provider>
        <Home/>
      </Provider>
      // <Provider>
      //    <NavigationContainer>
        
      //     <Stack.Navigator initialRouteName="Home">
      //     <Stack.Screen
      //                   name='Home'
      //                   component={HomeScreen}
      //               />
      //       <Stack.Screen
      //                   name='minIndex'
      //                   component={MineScreen}
      //               />  
      //     </Stack.Navigator>
          
             
      //     </NavigationContainer>
      // </Provider>
    )
  }
}