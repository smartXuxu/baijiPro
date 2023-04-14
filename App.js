import { Text, View } from 'react-native'
import React, { Component } from 'react'
import Index from './src/view/index'
//import Index from './src/view/index1'
export default class App extends Component {
  render() {
    return (
      <View>
        <Text>
        <Index />
        </Text>
      </View>
    )
  }
}