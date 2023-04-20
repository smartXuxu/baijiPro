
import { Text, StyleSheet, View ,Alert,TextInput,Dimensions,Clipboard} from 'react-native'
import React, { useState, useEffect } from 'react'
import { Button, Tag,Icon, WhiteSpace, WingBlank,List, Radio, Flex,Toast} from '@ant-design/react-native'

const Index=(props)=>{
  const RadioItem = Radio.RadioItem;

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
          title: "身份证",
          reg:'^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$',
        },
        {
          id: "4",
          title: "QQ号",
          reg:'/^\s{0}$|^[1-9]\d{4,14}$/',
        },
        {
          id: "5",
          title: "手机号码",
          reg:'/^\s{0}$|^1\d{10}$/',
        },
        {
          id: "6",
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
        {
          id: "10",
          title: "正整数",
          reg:'^\+?[1-9][0-9]*$',
        },
      ];
   
      const [inputText,setInputText] = useState('')
      const [optText,setOptText] = useState('正则')
      const [inputFocus,setINputFocus] = useState(false)
      const [serchText,setSerchText] = useState('');
      const [serchArr,setSerchArr] = useState([]);//搜索结果
      const [serchVisible,setSerchVisible] = useState(false);
      const [navIndex,setNavIndex] = useState(1);
      const [beginINput,setBeginINput] = useState('');
      const [numINput,setNumINput] = useState('');
      const [thrINput,setThrINput] = useState('');
      const [logic,setLogic] = useState('');
     const [beginReg,setBeginReg]= useState('');
     const [numReg,setNumReg]= useState('');
     const [thrReg,setThrReg]= useState('');
     const [sigReg,setSigReg]= useState('');
     const [checked,setChecked]= useState('');
     const [testRes,setTestRes]= useState('');
     const [testVal,setTestVal]= useState('');
     const[positionValue,setPositionValue] =useState(0)
     const[logicValue,setLogicValue] =useState(0)
     useEffect(() => {
      setBeginINput(beginINput)
  }, [beginINput]);
      function changeText(val){
          //console.log(val);
         // this.useState.inputText=val;
        setInputText(val.reg);
        setOptText(val.title)
         // this.onChangeText()
      }
     function clipbordText(val){
        if(val=='')return 
        Clipboard.setString(val)
        Toast.info({
          content: '复制成功！',
          mask: false,
        })

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
   
      function inBeginInput(iNput,num){
            console.log(iNput)
            if(!num){
              setBeginINput(iNput)
            }else if(num==1){
              setThrINput(iNput)
            }
           

      }
      function inNumInput(numStr){
        setNumINput(numStr.replace(/[\s+,\',\",\‘,\’,\“,\”,\《,\》,a-zA-z,\!,\`]/g,''))
       if(numStr.indexOf('~') <0&&numStr.indexOf('>') <0&&numStr.indexOf('<') <0){
        //非特定字符
        if(isNaN(Number(numStr))){
          setNumReg('')
          return 
        }
       }
       if(!numStr){
        setNumReg('')
          return 
       }
        if (numStr.indexOf('~') > -1) {
          numStr=numStr.split('~');
          setNumReg("{"+numStr[0]+','+numStr[1]+"}");
        }else if (numStr.indexOf('>') > -1) {
            numStr=numStr.split('>');
            console.log(numStr)
            setNumReg("{"+numStr[1]+","+"}");
        }else if (numStr.indexOf('<') > -1) {
            numStr=numStr.split('<');
            setNumReg("{0"+numStr[1]+","+"}");
        } else {
          setNumReg("{"+numStr+"}");
        }

      };
      
      function setRegInput(num){
        let reg = ''
        let stepArr='';
        if(num==0){
           stepArr = beginINput.split('|');
        }else if(num==1){
           stepArr = thrINput.split('|');
        }
        stepArr.forEach((item,index )=> {
          if (item === '数字'||item=='数') {
            if (reg.includes('0-9')) return
             reg += '0-9'
          } else if (item === '字母') {
            if (reg.includes('a-zA-Z')) return
            reg += '[a-zA-Z]'
          } else {
            if (reg.includes(item)) return
            console.log(2)
            if(stepArr[index+1]){
             // reg   += '('+item+')'+'|';
              reg   += item+'|';
            }else{
              reg   += item;
              // reg += '('+item+')';
            }
          }
        })
        
        console.log(reg)
        // if(reg.split("|").length>0){
        //   reg='(?:'+reg+")"
        // }
        if(num==0){
          setBeginReg(reg)
        }else if(num==1){
          setThrReg(reg)
        }
      };
      //单次预览生成结果 
      function cerateResult(){
        // console.log(beginReg)
        // console.log(numReg)
        if(beginReg){ 
          let regArr=[];
          
          if(beginReg.split("|").length>0&&numReg){
          let beginRegArr=beginReg.split("|")
          beginRegArr.forEach((item,index )=> {
            console.log(item)
            if(logicValue!=1){//包含 -纠结开头和结尾
              if(positionValue==1){
                if(beginRegArr[index+1]){
             // reg   += '('+item+')'+'|';
                  regArr+='^'+'('+item+')'+numReg+"|";
                  }else{
                    regArr+='^'+'('+item+')'+numReg
                  }
              }else if(positionValue==2){//结尾
              if(beginRegArr[index+1]){
                regArr+='('+item+')'+numReg+"$|"
                }else{
                  regArr+='('+item+')'+numReg+'$'
                }
              }else if(positionValue==3){//开头和结尾
                if(beginRegArr[index+1]){
                  regArr+='^'+'('+item+')'+numReg+"$|"
                  }else{
                    regArr+='^'+'('+item+')'+numReg+'$'
                  }

              }else{
              if(beginRegArr[index+1]){
                regArr+='('+item+')'+numReg+"|"
                }else{
                  regArr+='('+item+')'+numReg
                }
              }
            }
            else{//不包含
              
                // if(beginRegArr[index+1]){
                //   regArr+='('+item+')'+numReg+"|"
                // }else{
                //   regArr+='('+item+')'+numReg
                // }
                if(positionValue==1){
                  if(beginRegArr[index+1]){
               // reg   += '('+item+')'+'|';
                    regArr+='^' +'[^'+'('+item+ ')'+']'+numReg+"|";
                    }else{
                      regArr+='^'+'[^'+'('+item+')'+ ']'+numReg
                    }
                }else if(positionValue==2){//结尾
                if(beginRegArr[index+1]){
                  regArr+='[^'+'('+item+')'+ ']'+numReg+"$|"
                  }else{
                    regArr+='[^'+'('+item+ ')'+']'+numReg+'$'
                  }
                }else if(positionValue==3){//开头和结尾
                  if(beginRegArr[index+1]){
                    regArr+='^'+'[^'+'('+item+ ')'+']'+numReg+"$|"
                    }else{
                      regArr+='^'+'[^'+'('+item+')'+ ']'+numReg+'$'
                    }
  
                }else{
                if(beginRegArr[index+1]){
                  regArr+='[^'+'('+item+')'+ ']'+numReg+"|"
                  }else{
                    regArr+='[^'+'('+item+')'+ ']'+numReg
                  }
                }
            }
           
            
            })
            console.log(regArr)
            setSigReg(regArr)
          }else if(beginReg.split("|").length>0){
            let beginRegArr=beginReg.split("|")
          beginRegArr.forEach((item,index )=> {
            console.log(item)
            if(logicValue!=1){//包含 -纠结开头和结尾
              if(positionValue==1){
                if(beginRegArr[index+1]){
                  regArr+='^'+'('+item+')'+"|";
                  }else{
                    regArr+='^'+'('+item+')'
                  }
              }else if(positionValue==2){//结尾
              if(beginRegArr[index+1]){
                regArr+='('+item+')'+"$|"
                }else{
                  regArr+='('+item+')'+'$'
                }
              }else if(positionValue==3){//开头和结尾
                if(beginRegArr[index+1]){
                  regArr+='^'+'('+item+')'+"$|"
                  }else{
                    regArr+='^'+'('+item+')'+'$'
                  }

              }else{
              if(beginRegArr[index+1]){
                regArr+='('+item+')'+"|"
                }else{
                  regArr+='('+item+')'
                }
              }
            }
            else{//不包含
             //+'[^'+item+ ']'+
                // if(beginRegArr[index+1]){
                //   regArr+='('+item+')'+"|"
                // }else{
                //   regArr+='('+item+')'
                // }
                if(positionValue==1){
                  if(beginRegArr[index+1]){
                    regArr+='^'+'('+'[^'+item+ ']'+')'+"|";
                    }else{
                      regArr+='^'+'('+'[^'+item+ ']'+')'
                    }
                }else if(positionValue==2){//结尾
                if(beginRegArr[index+1]){
                  regArr+='('+'[^'+item+ ']'+')'+"$|"
                  }else{
                    regArr+='('+'[^'+item+ ']'+')'+'$'
                  }
                }else if(positionValue==3){//开头和结尾
                  if(beginRegArr[index+1]){
                    regArr+='^'+'('+'[^'+item+ ']'+')'+"$|"
                    }else{
                      regArr+='^'+'('+'[^'+item+ ']'+')'+'$'
                    }
  
                }else{
                if(beginRegArr[index+1]){
                  regArr+='('+'[^'+item+ ']'+')'+"|"
                  }else{
                    regArr+='('+'[^'+item+ ']'+')'
                  }
                }
            }
            })
            
          }
          // else{//不必累加的
          //   //beginReg
          //   let regSig=beginReg;
          //   if(logicValue!=1){//包含 -纠结开头和结尾
          //     if(positionValue==1){
          //       regSig='^'+beginReg
                
          //     }
          //   else if(positionValue==2){//结尾
             
          //         regSig=beginReg+'$'
          //     }else if(positionValue==3){//开头和结尾
          //           regSig='^'+beginReg+'$'
                  

          //   }else{
          //     regSig=beginReg
          //     }
          //   }
          //   else{//不包含
             
          //     regSig='?!'+beginReg
          //   }


          // }
          //if(regArr.length){
            setSigReg(regArr)
        //  }else{
          //  setSigReg(regSig)
         // }
          
        }
      };
      //复位
      function resetOpt(){
        setBeginINput('');
        setNumINput('');
        setSigReg('');
      };
      //特定位置
      function onGroupPosition(e){
        setPositionValue(e.target.value);
      };
      //逻辑词
      function onGroupLogic(e){
        setLogicValue(e.target.value)
      }
      
      function regTest(){
        console.log(new RegExp(sigReg))
        if(testVal){
          console.log()
          let testStr=new RegExp(sigReg.replace(/\s/g,'')).test(testVal)?'匹配':'不匹配'
          setTestRes(testStr)
        }

      }
    return (
        <View style={styles.container}>
          
        <View style={styles.navTab}>
            <Text style={[styles.text,navIndex==0?styles.actText:'',styles.firstText]} onPress={()=>{setNavIndex(0)}}>常用正则</Text> 
            <Text style={[styles.text,navIndex==1?styles.actText:'']} onPress={()=>{setNavIndex(1)}}>正则生成</Text> 
        </View>
        {
            navIndex==0? (<View style={styles.commonBox} >
              
              <View style={styles.viewBox}>
                  {
                      DATA.map((item,index)=>{
                          return (<Text  key={item.id}  style={styles.btn} onPress={()=>{changeText(item)}}>{item.title}</Text>)
                      })
                  }
              </View>
              
              <View style={styles.bottomOpt}>
                  <Text style={styles.optText}>{optText}:</Text>
                  <TextInput placeholder='正则表达式' value={inputText}  style={[styles.input,inputFocus ? styles.focusedTextInput : '']} multiline={true} numberOfLines={2} textAlignVertical="top" editable={true} onFocus={()=>{setINputFocus(true)}} onBlur={()=>{setINputFocus(false)}}></TextInput>
                  <Button type="ghost" size="small" style={styles.optBtn} onPress={()=>{clipbordText(inputText)}}>复制</Button>
              </View>
              </View>):(<View>
                <View style={[styles.beginBox,styles.boxIns]}>
                <Text style={[styles.textReg]}>step1:规则示例：数字|字母，或特定字符例如'vx|微信'等 （| 或者）</Text>
                <TextInput placeholder='请输入匹配关键词' multiline={true} numberOfLines={2} placeholderTextColor="#999" style={[styles.boxIn]} value={beginINput} onChangeText={(val)=>{inBeginInput(val)}} onBlur={()=>{setRegInput(0)}}/>
                </View>
                <View style={[styles.secBox,styles.boxIns]}>
                <Text style={[styles.textReg]}>step2:位数（限定符,可选） 具体写法如下：大于x(&gt;x)、小于y(&lt;y)、n到m之间(n~m)</Text>
                <TextInput placeholder='请输入位数' placeholderTextColor="#999" multiline={true} numberOfLines={1}  style={[styles.boxIn]} value={numINput} onChangeText={(val)=>{inNumInput(val)}} />
                </View>
               
                <View style={[styles.boxOpt]}>
              
              <View  style={[styles.btnBox]}>
                  <List renderHeader={  'step3:特定位置（可选）：' }>
                    <Radio.Group
                    onChange={onGroupPosition}
                    value={positionValue} > <Flex style={{flexWrap:'wrap'}}>
                    <RadioItem value={0}>不限</RadioItem>
                    <RadioItem value={1}>开头</RadioItem>
                    <RadioItem value={2}>结尾</RadioItem>
                    <RadioItem value={3}>开头和结尾</RadioItem>
                    </Flex>
                  </Radio.Group>
        
                  </List>
                
                </View>
              </View>
               
               <View style={[styles.boxOpt]}>
              
                <View  style={[styles.btnBox]}>
                    <List renderHeader={  'setp4:附加:逻辑词操作（可选）:' }>
                      <Radio.Group
                      onChange={onGroupLogic}
                      value={logicValue}> <Flex>
                      <RadioItem value={0}>包含</RadioItem>
                      <RadioItem value={1}>不包含</RadioItem>
                      </Flex>
                    </Radio.Group>
          
                    </List>
                 
                  </View>
                </View>
                <View style={styles.sigCreBox}>
                  <Button title='生成' style={styles.serchBtn} type="primary" onPress={()=>{cerateResult()}}>生成</Button>
                  <Text style={[styles.color666]}>单次结果预览</Text>
                  <View>
                    {sigReg?<Text style={styles.preview}>/{sigReg}/</Text>:<Text></Text>}
                   
                  </View>
                </View>
                {/* <View style={styles.operateBtn}>
                  <Button title='复位' onPress={()=>{resetOpt()}}/>
                  <Button title='返回'/>
                </View> */}
                {/* <View style={styles.allBox}>
                  <Text style={[styles.color666]}>合计预览</Text>
                  <View>
                  <Text>{sigReg}</Text>
                  </View>
                </View> */}
                <View style={styles.testBoxs}>
                  <View style={styles.testBox}> 
                  <Text style={[styles.color666]}>校验结果：</Text>
                <TextInput placeholder='请输入校验值' placeholderTextColor="#999" multiline={true} numberOfLines={2} style={[styles.boxIn]} value={testVal} onChangeText={(val)=>{setTestVal(val)}} />
                </View>
                  <Button onPress={()=>{regTest()}} style={{marginVertical:10}}>校验</Button>
                  <Text>测试结果：{testRes}</Text>
                </View>
                </View>)
        }
          
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
        padding:15,
        width:'100%',
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
     paddingTop:30,
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
    navTab:{
        flexDirection:'row',
        

    },
    text:{
        fontSize:24,
        color:"#666",
        height:40,
    },
    firstText:{
        marginRight:40,
        marginLeft:30,
    },
    actText:{
       color:'#ff650d',
       borderBottomColor:'#ff650d',
       borderBottomWidth:2,
    },
    btn:{
      borderWidth:1,
      borderColor:'#00bbff',
      backgroundColor:'#00bbff',
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
      borderColor:"#ff650d",
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
      height:40,
      width:50,
   },
   optText:{
     textAlign:'center',
     width:80,
   },
   color666:{
    color:"#666",
    fontSize:16,
    lineHeight:20,
    marginTop:6,

   },
   textReg:{
    paddingTop:10 ,
    paddingBottom:9,
   backgroundColor: '#f5f5f9',
   color: 'rgb(136, 136, 136)',
   paddingLeft:10,
   },

   meChar:{
    flexDirection:'row',
    flexWrap:"wrap",
    marginRight:10,

   },
   boxIns:{
    marginTop:10,

   },
   boxIn:{
    borderWidth:1,
    borderColor:'#ff650d',
    borderRadius:10,
    marginTop:6,
    padding:10,

   },
   beginBox:{

   },
   sigCreBox:{

   },
   boxOpt:{
    //flexDirection:"row",
    marginTop:10,
    //alignItems:'center',
   },
   btnBox:{
    // flexDirection:"row",
   
    // alignItems:'center',
    // flexWrap:'wrap',
   },
   btnOpt:{
    marginLeft:5,
    borderRadius:5,
    padding:5,
    height:30,
    lineHeight:30,
    fontSize:14, 
    marginTop:10,
    border:0,
    color:"#fff",
    
   },
   serchBtn:{
    marginTop:10,
    borderRadius:10,
    height:30,
    

   },
   preview:{
    borderWidth:1,
    borderColor:'#f5f5f9',
    backgroundColor:"#f5f5f9",
    borderRadius:10,
    padding:20,

   },
   testBox:{
   // flexDirection:'row',

   },
})