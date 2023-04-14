
import { Text, StyleSheet, View ,Button,Alert,TextInput,Dimensions,Clipboard} from 'react-native'
import React, { useState } from 'react'

const Index=(props)=>{
    const DATA = [
        {
          id: "0",
          title: "网站",
          reg:'/^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/',
        },
        {
          id: "1",
          title: "邮箱地址",
          reg:'/^\s{0}$|^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,8}$/',
        },
        {
          id: "2",
          title: "银行卡",
          reg:'/^\s{0}$|^\d{12,30}$/',
        },
        {
          id: "3",
          title: "qq号",
          reg:'/^\s{0}$|^[1-9]\d{4,14}$/',
        },
        {
          id: "4",
          title: "手机号码",
          reg:'/^\s{0}$|^1\d{10}$/',
        },
        {
          id: "5",
          title: "用户名",
          reg:'/^\s{0}$|^[a-zA-Z][a-zA-Z0-9_]{3,15}$/',
        },
        
        {
          id: "7",
          title: "数字",
          reg:'/^\s{0}$|^-?[0-9]+(\.\d+)?$/',
        },
       
        {
          id: "8",
          title: "字母",
          reg:'/^[a-zA-Z]+$/',
        },
         {
          id: "9",
          title: "数字和字母",
          reg:'/^[a-zA-Z0-9]+$/',
        },
      ];
    const RegData=[
      { title: "身份证号", reg: "\d{17}[\d|x]|\d{15}" },
      { title: "email地址", reg: "\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}" },
      { title: "网址URL", reg: "^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+" },
      { title: "手机号", reg: "0?(13|14|15|18|17)[0-9]{9}" },
      { title: "QQ号码", reg: "[1-9]([0-9]{4,10})" },
      { title: "用户名", reg: "[A-Za-z0-9_\-\u4e00-\u9fa5]+" },
      { title: "负浮点数", reg: "-([1-9]\d*.\d*|0\.\d*[1-9]\d*)" },
      { title: "整数", reg: "-?[1-9]\d*" },
      { title: "正浮点数", reg: "[1-9]\d*.\d*|0\.\d*[1-9]\d*" },
      { title: "日期格式", reg: "^\d{4}-\d{1,2}-\d{1,2}" },
      { title: "邮政编码", reg: "\d{6}" },
      { title: "域名", reg: "[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(/.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+/.?" },
      { title: "数字", reg: "^[0-9]*$" },
      { title: "零和非零开头的数字", reg: "^(0|[1-9][0-9]*)$" },
      { title: "非零开头的最多带两位小数的数字", reg: "^([1-9][0-9]*)+(.[0-9]{1,2})?$" },
      { title: "正数、负数、和小数", reg: "^(-|+)?\d+(.\d+)?$" },
      { title: "有两位小数的正实数", reg: "^[0-9]+(.[0-9]{2})?$" },
      { title: "非零的正整数", reg: "^[1-9]\d$" },
      { title: "非零的负整数", reg: "^-[1-9]\d$" },
      { title: "非负整数", reg: "^[1-9]\d*|0$" },
      { title: "非正整数", reg: "^((-\d+)|(0+))$" },
      { title: "汉字", reg: "^[\u4e00-\u9fa5]{0,}$" },
      { title: "由26个英文字母组成的字符串", reg: "^[A-Za-z]+$" },
      { title: "xml文件", reg: "^([a-zA-Z]+-?)+[a-zA-Z0-9]+\.[x|X][m|M][l|L]$" },
      { title: "中文字符", reg: "[\u4e00-\u9fa5]" },
      { title: "IP地址", reg: "\d+.\d+.\d+.\d+" },
  ];
      const [inputText,setInputText] = useState('')
      const [optText,setOptText] = useState('正则')
      const [inputFocus,setINputFocus] = useState(false)
      const [serchText,setSerchText] = useState('');
      const [serchArr,setSerchArr] = useState([]);//搜索结果
      const [serchVisible,setSerchVisible] = useState(false);
     
  
      function changeText(val){
          //console.log(val);
         // this.useState.inputText=val;
        setInputText(val.reg);
        setOptText(val.title)
         // this.onChangeText()
      }
     function clipbordText(val){
      // console.log(val);
       // Alert.alert(val)
     //  console.log(inputText);
        if(val=='')return 
        Clipboard.setString(val)
      };
      function serchReg(){
      //  console.log(serchText);
      if(serchText==''){
        setSerchVisible(false)
        return 
      }
        let arr=[];
        for(let i=0;i<RegData.length;i++){
          if(RegData[i].title.indexOf(serchText)>-1){
            arr.push(RegData[i]);
          }
        }
      setSerchArr(arr)
      if(arr.length){
        setSerchVisible(true)
      }
     // console.log(arr);

      };
      function serchChangeText(serchText){
      //  console.log(serchText);
        setSerchText(serchText)

      };
    return (
        <View style={styles.container}>
          <View style={styles.inputBox}>
            <TextInput placeholder="请输入您要搜索的正则表达式关键字：" style={[styles.input,styles.sinput]} value={serchText} onChangeText={(newText)=>{serchChangeText(newText)}}></TextInput>
            <Text onPress={()=>{serchReg()}} style={[styles.btn,styles.serBtn]}>搜索</Text>
          </View>
          <Text style={{paddingLeft:20}}>搜索结果：</Text>
          {
          serchVisible? 
          (<View style={{flexDirection:'row',flexWrap:'wrap'}}>
            {serchArr.map((item,index)=>{
              return (<Text style={[styles.serchLi]} key={item.title} onPress={()=>{changeText(item)}} >{item.title}</Text>)
            })}
            
            </View>):
             (<View><Text style={{padding:20,color:'#999',fintSize:"30"}}>暂时没有相匹配的~</Text></View>)
             }
       
          <View style={styles.commonBox}>
              <Text style={{fontWeight:'bold',paddingLeft:10}}>常用正则表达式：</Text>
              <View style={styles.viewBox}>
                  {
                      DATA.map((item,index)=>{
                          return (<Text  key={item.id}  style={styles.btn} onPress={()=>{changeText(item)}}>{item.title}</Text>)
                      })
                  }
              </View>
              </View>
              <View style={styles.bottomOpt}>
                  <Text style={styles.optText}>{optText}:</Text>
                  <TextInput placeholder='正则表达式' value={inputText}  style={[styles.input,inputFocus ? styles.focusedTextInput : '']} multiline={true} numberOfLines={3} textAlignVertical="top" editable={true} onFocus={()=>{setINputFocus(true)}} onBlur={()=>{setINputFocus(false)}}></TextInput>
                  <Button title="复制" style={styles.optBtn} onPress={()=>{clipbordText(inputText)}}></Button>
              </View>
              
        </View>
    )
}
export default Index

const styles = StyleSheet.create({
    focusedTextInput: {//input 获取焦点的样式展示
     // backgroundColor:'red',
      borderColor:"red",
    },
    container:{
        padding:20,
    },
    inputBox:{
      flexDirection:'row',
      alignItems:'center',
       paddingLeft:10,

    },
    sinput:{
      width:Dimensions.get('window').width-160,
      borderRadius:15,
     
    },
    serBtn:{
      backgroundColor: 'rgb(33, 150, 243)',
    },
    commonBox:{
     // paddingHorizontal:30,
    },
    serchLi:{
      backgroundColor:'pink',
      borderRadius:5,
      color:"#fff",
      height:30,
      lineHeight:30,
      margin:10,
      textAlign:'center',
      minWidth:70,
      width:'auto',
      paddingHorizontal:5,
    },
    viewBox:{
      flexDirection:"row",
      flexWrap:'wrap',
      
    },
    btn:{
      borderWidth:1,
      borderColor:'rgb(33, 150, 243)',
      backgroundColor:'rgb(33, 10, 243)',
      borderRadius:5,
      color:"#fff",
      height:30,
      lineHeight:30,
      margin:10,
      textAlign:'center',
      minWidth:80,
      width:'auto',
     
    },
    input:{
      width:Dimensions.get('window').width-200,
      marginHorizontal:10,
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
     width:90,
   },
   optText:{
     textAlign:'center',
     width:80,
   }
})