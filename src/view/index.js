
import { Text, StyleSheet,Image, View ,Alert,TextInput,Dimensions,Clipboard,TouchableHighlight} from 'react-native'
import React, { useState, useEffect } from 'react'
import { Button, Tag,Icon, WhiteSpace, WingBlank,List, Radio, Flex,Toast} from '@ant-design/react-native'
import Drawers from './drawer'
const Index=(props)=>{
  const RadioItem = Radio.RadioItem;
  let DrawerChild=React.createRef();
   
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
      const [allReg,setAllReg]= useState('');
      const [sigReg,setSigReg]= useState('');
      const [checked,setChecked]= useState('');
      const [testRes,setTestRes]= useState('');
      const [testVal,setTestVal]= useState('');
      const [positionValue,setPositionValue] =useState(0)
      const [logicValue,setLogicValue] =useState(0)
      const [drawerShow,setDrawerShow]=useState(false);
    
      // const regex = /^(?!.*(vx)|.*([0-9])|.*(weixin)).*$|(^(?!.*([a-z])|.*([0-9])|.*(weixin)).*$)/;
      
      // console.log(regex.test('a'));
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
        setNumINput(numStr.replace(/[\s+,\',\",\‘,\’,\“,\”,\《,\》,a-zA-z,\!,\`,\-,\+,\=,\|]/g,''))
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
          if(!beginINput)return 
           stepArr = beginINput.split('|');
        }
        stepArr.forEach((item,index )=> {
          if (item === '数字'||item=='数') {
            if (reg.includes('0-9')) return
             reg += '[0-9]'
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
       
        if(num==0){
          setBeginReg(reg)
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
          //  if(item=='0-9'){item='/\d+'};
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
              
               
                if(positionValue==1){
                  if(beginRegArr[index+1]){
               // reg   += '('+item+')'+'|';
               
                    regArr+='^'+'.*('+item+ ')'+numReg+"|";
                    }else{
                      regArr+='^'+'.*('+item+')'+numReg
                    }
                }else if(positionValue==2){//结尾
                if(beginRegArr[index+1]){
                  regArr+='.*('+item+')'+numReg+"$|"
                  }else{
                    regArr+='.*('+item+ ')'+numReg+'$'
                  }
                }else if(positionValue==3){//开头和结尾
                  if(beginRegArr[index+1]){
                    regArr+='^'+'.*('+item+ ')'+numReg+"$|"
                    }else{
                      regArr+='^'+'.*('+item+')'+numReg+'$'
                    }
  
                }else{
                    if(beginRegArr[index+1]){
                      regArr+='.*('+item+')'+numReg+"|"
                    }else{
                      regArr+='.*('+item+')'+numReg
                    }
                }
            }
           
            
            })
            console.log(regArr)
            if(logicValue==1){
              regArr='^(?!'+regArr+').*$';
            }
           // setSigReg(regArr)
          }
          else if(beginReg.split("|").length>0){
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
                    regArr+='^'+'.*('+item+')'+"|";
                    }else{
                      regArr+='^'+'.*('+item+')'
                    }
                }else if(positionValue==2){//结尾
                if(beginRegArr[index+1]){
                  regArr+='.*('+item+')'+"$|"
                  }else{
                    regArr+='.*('+item+')'+'$'
                  }
                }else if(positionValue==3){//开头和结尾
                  if(beginRegArr[index+1]){
                    regArr+='^'+'.*('+item+')'+"$|"
                    }else{
                      regArr+='^'+'.*('+item+')'+'$'
                    }
  
                }else{
                if(beginRegArr[index+1]){
                  regArr+='.*('+item+')'+"|"
                  }else{
                    regArr+='.*('+item+')'
                  }
                }
            }
            })
            
          }
          //不包含
            if(logicValue==1){
              regArr='^(?!'+regArr+').*$';
            }
            setSigReg(regArr)
            if(allReg){
              setAllReg(allReg+"|"+regArr);
            }else{
              setAllReg(regArr);
            }
           
       
        }
      };
      //next 连接 
      function nextOpt(){

      };
      function resetOpt(){
        setBeginINput('');
        setNumINput('');
        setSigReg('');
        setPositionValue(0);
        setLogicValue(0);
        setTestVal('');
        setTestRes('');
        //setAllReg('');
      };
      //特定位置
      function onGroupPosition(e){
        setPositionValue(e.target.value);
      };
      //逻辑词
      function onGroupLogic(e){
        setLogicValue(e.target.value)
      };
      
      function regTest(){
        console.log(new RegExp(sigReg))
        if(sigReg&&!allReg){setAllReg(sigReg)};
        console.log(allReg)
        if(testVal&&allReg){
          let testStr=new RegExp(allReg.replace(/\s/g,'')).test(testVal)?'匹配':'不匹配'
          setTestRes(testStr)
        }else if(testVal&&!allReg&&sigReg){
          let testStr=new RegExp(sigReg.replace(/\s/g,'')).test(testVal)?'匹配':'不匹配'
          setTestRes(testStr)
        }

      };
   //调用子组件的方法
    openDrawers = () => {
      console.log(DrawerChild)
      DrawerChild.current&& DrawerChild.current.openDrawer()
      };
    return (
        <View style={styles.container} >
          <Drawers visible={drawerShow}
                  showDrawers={drawerShow} onRef={DrawerChild}
                  setCommonReg={(item)=>{resetOpt(),setBeginINput(item.reg),setAllReg(item.reg),setSigReg(item.reg),console.log(item)}}  
                  closeDrawer={() => {
                  setDrawerShow(false)
                }}
                />
         
        <View style={styles.navTab}>
         <TouchableHighlight  underlayColor={'rgba(0,0,0,0)'} onPress={()=>{ setDrawerShow(true),openDrawers()}} style={{marginRight:30,}}> 
         <Image
            style={styles.tinyLogo}
            source={require('../assets/images/meuns.png')}
          />
       </TouchableHighlight>
            <Text style={[styles.text,navIndex==1?styles.actText:'']} onPress={()=>{setNavIndex(1)}}>正则生成</Text> 
        </View>
        <View style={{width:'100%',flexWrap:'wrap',flexDirection:"column"}}>
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
                  <List renderHeader={ 'step3:特定位置（可选）：' }>
                    <Radio.Group
                    onChange={onGroupPosition}
                    value={positionValue} >
                       <Flex style={{flexWrap:'wrap',alignItems:'center'}}>
                    <Radio value={0} style={styles.radioMar}><Text >不限</Text></Radio>
                    <Radio value={1} style={styles.radioMar}><Text>开头</Text></Radio>
                    <Radio value={2} style={styles.radioMar}><Text>结尾</Text></Radio>
                    <Radio value={3} style={styles.radioMar}><Text>开头和结尾</Text></Radio>
                    </Flex>
                  </Radio.Group>
        
                  </List>
                
                </View>
              </View>
               
               <View style={[styles.boxOpt]}>
              
                <View  style={[styles.btnBox]}>
                    <List renderHeader={'setp4:附加:逻辑词操作（可选）:' }>
                      <Radio.Group
                      onChange={onGroupLogic}
                      value={logicValue}>
                         <Flex style={{alignItems:'center'}}>
                      <Radio value={0} style={styles.radioMar}><Text style={{height:50,lineHeight:50,}}>包含</Text></Radio>
                      <Radio value={1} style={styles.radioMar}><Text>不包含</Text></Radio>
                      </Flex>
                    </Radio.Group>
          
                    </List>
                 
                  </View>
                </View>
                <View style={styles.sigCreBox}>
                  <Button  style={styles.serchBtn} type="primary" onPress={()=>{cerateResult()}}>生成</Button>
                  <Text style={[styles.color666]}>单次结果预览：</Text>
                  <View style={{marginTop:4}}>
                    {sigReg?<View style={{flexDirection:'row',justifyContent:'space-between', backgroundColor:"#f5f5f9",alignItems:'center'}}>
                      <Text style={[styles.preview]}>/{sigReg}/</Text>
                      <Button type="ghost" size="small" onPress={()=>{clipbordText('/'+sigReg+'/')}} style={{marginRight:6}}>复制</Button>
                      </View>:<Text></Text>
                      }
                  </View>
                </View>

                {/* <View style={{marginTop:10,}}>
                <Text style={[styles.textReg]}>step5:附加按钮（可选）拼接：可继续下一次的正则； 复位：全部清空，回到初始选择</Text>
                  <View style={{flexDirection:'row',marginTop:10,justifyContent:'center'}}>
                  <Button type="primary" onPress={()=>{resetOpt()}} style={{width:"40%",marginRight:30,}}>拼接NEXT</Button>
                  <Button type="warning" style={{width:"40%"}} onPress={()=>{resetOpt();setAllReg('')}}>复位</Button>
                  </View>
                  
                </View>
                <View style={styles.allBox}>
                  <Text style={[styles.color666]}>合计预览：</Text>
                  {
                    allReg?<View style={{flexDirection:'row',justifyContent:'space-between', backgroundColor:"#f5f5f9",alignItems:'center'}}><Text style={[styles.preview]}>/{allReg}/</Text><Button type="ghost" size="small" onPress={()=>{clipbordText('/'+allReg+'/')}} style={{marginRight:6}}>复制</Button></View>:<Text></Text>
                  }
                  
                </View> */}

                <View style={styles.testBoxs}>
                  <View style={styles.testBox}>
                    <Text style={[styles.color666]}>校验结果：</Text>
                    <TextInput placeholder='请输入校验值' placeholderTextColor="#999" multiline={true} numberOfLines={2} style={[styles.boxIn]} value={testVal} onChangeText={(val)=>{setTestVal(val)}}/>
                </View>
                  <Button onPress={()=>{regTest()}} style={{marginVertical:10}}>校验</Button>
                  <Text>测试结果：{testRes}</Text>
                  </View>
                </View>
        
        </View>
    )
}
export default Index

const styles = StyleSheet.create({
    focusedTextInput: {//input 获取焦点的样式展示
      borderColor:"red",
    },
    container:{
        padding:15,
        width:'100%',
        height:"100%",
       // overflow:'scroll',
      
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
        // justifyContent:'center',
         alignItems:'center',

    },
    tinyLogo:{
      width:21,
      height:15,
      justifyContent: 'center' ,
    },
    text:{
        fontSize:20,
        color:"#666",
        height:40,
        lineHeight:40,
    },
    firstText:{
        marginRight:40,
        marginLeft:30,
    },
    actText:{
       color:'#ff650d',
      //  borderBottomColor:'#ff650d',
      //  borderBottomWidth:2,
      
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
   radioMar:{
    marginRight:20,
    marginLeft:10,
    height:40,
    lineHeight:40,

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
    paddingVertical:10,
    paddingHorizontal:20,
    width:Dimensions.get('window').width-60,

   },
   testBoxs:{
    paddingBottom:20,
   // flexDirection:'row',

   },
})