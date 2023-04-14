import { Text ,View,SafeAreaView,FlatList,StyleSheet,StatusBar,Button,Alert,TextInput,Dimensions,Clipboard } from 'react-native'
import React, { Component,useState }from 'react'

const DATA = [
    {
      id: "0",
      title: "中文字符",
      reg:'[\u4e00-\u9fa5]',
    },
    {
      id: "1",
      title: "网站",
      reg:'^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+',
    },
    {
      id: "2",
      title: "邮箱地址",
      reg:'/^\s{0}$|^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,8}$/',
    },
    {
      id: "3",
      title: "qq号",
      reg:'[1-9]([0-9]{5,11})',
    },
    {
      id: "4",
      title: "手机号码",
      reg:'/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/',
    },
    {
      id: "5",
      title: "用户名",
      reg:'/^\s{0}$|^[a-zA-Z][a-zA-Z0-9_]{3,15}$/',
    },
    {
      id: "6",
      title: "银行卡",
      reg:'/^\s{0}$|^\d{12,30}$/',
    },
    {
      id: "7",
      title: "数字",
      reg:'/^\s{0}$|^-?[0-9]+(\.\d+)?$/',
    },
  ];
  
export default class index1 extends Component {
  constructor(){
    super()
    this.state={
        inputText:'',
        text:'名称',
    }
  }
  clipbordText(){
    Alert.alert(this.state.inputText)
    Clipboard.setString(this.state.inputText)
  };
  
    render() {
     // const [inputText] = useState({})
    const Item = ({ title,reg}) => {
    return (
      <View style={styles.item}>
        <Button title={title} style={styles.btn} onPress={()=>{this.setState({inputText:reg,text:title})}}/>
      </View>
    );
  }
  // 
  const renderItem = ({ item }) => (
    <Item title={item.title} reg={item.reg} />
  );  


    return (
      <View style={styles.container}>
        <Text style={styles.text}>常用正则表达式：</Text> 
       <SafeAreaView style={styles.viewList}>
       <FlatList
        data={DATA} 
       // horizontal={true}
        renderItem={renderItem}
       // style={styles.flatList}
        keyExtractor={item => item.id}
       //contentContainerStyle={styles.flatList}
        numColumns ={4} // 一行4个
      />
       </SafeAreaView>
       <View style={styles.bottomOpt}>
         <Text style={styles.optText}>{this.state.text}：</Text>
         <TextInput style={[styles.input]} placeholder='正则展示' value={this.state.inputText} editable={false} />
         <Button style={styles.optBtn} color= '#ff9900' title='复制' onPress={() => {
  Clipboard.setString(this.state.inputText)
}}/>
     </View>
      </View>
    )

  }
}

// onChangeText={(text) => this.setState({inputText: text})}
const styles = StyleSheet.create({
    container: {
       // flex: 1,
        marginTop: StatusBar.currentHeight || 0,
       // alignItems:'center',
      },
      text:{
        fontSize:30,
       fontWeight:'bold',
       
      },
      flatList:{
        flexDirection: 'row',
        // 一行显示不下,换一行
       flexWrap: 'wrap',
      //  侧轴方向
      alignItems: 'center', // 必须设置,否则换行不起作用
      paddingHorizontal:10,
      },
      item: {
        backgroundColor: '#f9c2ff',
        padding: 2,
        marginVertical: 4, 
         //flexDirection:'row',
     //  marginHorizontal: 10,
    //     flexDirection: 'row',
    // justifyContent:'center',
       // width:"32%",
       width:100,
       flex:4,
      },
      btn:{
        color:"#666",
      },
      title: {
        fontSize: 32,
      },

      input:{
       width:Dimensions.get('window').width-200,
         margin:10,
         borderWidth:1,
         borderColor:"red",
         padding:10,
         color:'#333',
     },
     bottomOpt:{
       flexDirection:"row",
       alignItems:"center",
       height:100,
       paddingLeft:10,
     },
     optBtn:{
      height:80,
      width:100,
    },
    optText:{
      textAlign:'center',
      width:80,
    }
  });