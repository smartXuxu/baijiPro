import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { Button, Provider, Toast } from '@ant-design/react-native';
import Index from './src/view/index'
//import Index from './src/view/index1'
export default class App extends Component {
  render() {
    return (
      <View>
        <Text>
        <Provider>
        <Index />
        </Provider>
        </Text>
      </View>
    )
  }
}