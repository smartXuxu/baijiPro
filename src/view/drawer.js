// 抽屉组件 
import React, { useState,useRef,useEffect,forwardRef, useCallback,useImperativeHandle} from 'react'

import { ScrollView, StyleSheet, Text, View ,Animated,Dimensions,Modal,TouchableHighlight} from 'react-native'
import { Button, Drawer, List, WhiteSpace, Grid, Icon, SearchBar } from '@ant-design/react-native'
import PropTypes from 'prop-types' 
const Drawers =  React.forwardRef((props,ref) => {
    const Item = List.Item
    const WINDOW = Dimensions.get('window');
    const [drawer, setDrawer] = useState(false);
    const {  visible, showDrawers,menuPosition,setCommonReg } = props
    const [show, setShow] = useState(visible)
    const [animateValue, setAnimateValue] = useState(new Animated.Value(0));
    useEffect(() => {
        setShow(visible)
    }, [props])
    //用useImperativeHandle暴露一些外部ref能访问的属性
    useImperativeHandle(props.onRef,()=>{
      return {
        openDrawer:openDrawer,
       // closeDrawer:closeDrawer,
      }
    });
  //   componentDidMount((props)=> {
  //    props.onRef &&props.onRef();
  // });
    function closeDrawer() {
        props.closeDrawer && props.closeDrawer()
        animate(0);
    };
    function openDrawer() {
       // setDrawer(true)
       props.showDrawer && props.showDrawer()
       animate(1);

    }
    const DATA = [
        {
            id: "0",
            title: "网站",
            reg: '((https|http|ftp|rtsp|mms)?:\\/\\/)[^\\s]+',
        },
        {
            id: "1",
            title: "邮箱地址",
            reg: '\\w[-\\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\\.)+[A-Za-z]{2,14}',
        },
        {
            id: "2",
            title: "银行卡",
            reg: '[1-9]{1}(?:\\d{15}|\\d{18})',
        },
        {
            id: "3",
            title: "身份证",
            reg: '\\d{17}[\\d|x]|\\d{15}',
        },
        {
            id: "4",
            title: "QQ号",
            reg: '[1-9]([0-9]{4,10})',
        },
        {
            id: "5",
            title: "手机号码",
            reg: '0?(13|14|15|18|17)[0-9]{9}',
        },
        {
            id: "6",
            title: "用户名",
            reg: '[A-Za-z0-9_\\-\\u4e00-\\u9fa5]+',
        },

        {
            id: "7",
            title: "数字",
            reg: '[0-9]',
        },

        {
            id: "8",
            title: "字母",
            reg: '^[a-zA-Z]+$',
        },
        {
            id: "9",
            title: "数字和字母",
            reg: '^[a-zA-Z0-9]+$',
        },
        {
            id: "10",
            title: "正整数",
            reg: '[1-9]\\d*',
        },
        {//非数字字符  
            id: "11",
            title: "非数字字符",
            reg: '\\D',
        },
        {
          id:'12',
          title:'任意字符(零次或多次）',
          reg:'.*'
        },
        {
            //匹配包括下划线的任何单词字符 \w
            id: "13",
            title: "单词字符",
            reg: '\\w',
        },
        {
            //非单词字符 \W
            id: "14",
            title: "非单词字符",
            reg: '\\W',
        },
        
        {
          id:'15',
          title:'除了\\n以外的字符',
          reg:'.'
        },

    ];
 // 添加动画效果
 function animate (toValue) {
    Animated.timing(animateValue, {
      toValue: toValue,
      duration: 200,
      useNativeDriver: true,
      friction: 9,
    }).start();
  };

  // 判断position从不同位置唤出抽屉
  const getPosition = useCallback(() => {
    switch (menuPosition) {
      case 'left':
        return {
          translateX: animateValue.interpolate({
            inputRange: [0, 1],
           // outputRange: [ 0,-WINDOW.width],
           outputRange: [ -WINDOW.width,0],
          }),
        };
      case 'right':
        return {
          translateX: animateValue.interpolate({
            inputRange: [0, 1],
            outputRange: [WINDOW.width, 0],
          }),
        };
      case 'top':
        return {
          translateY: animateValue.interpolate({
            inputRange: [0, 1],
            outputRange: [-WINDOW.height, 0],
          }),
        };
      case 'bottom':
        return {
          translateY: animateValue.interpolate({
            inputRange: [0, 1],
            outputRange: [WINDOW.height, 0],
          }),
        };
      default:
        return {
          translateX: animateValue.interpolate({
            inputRange: [0, 1],
            outputRange: [-WINDOW.width, 0],
          }),
        };
    }
  }, [animateValue, menuPosition]);
 function onSubmitPress(item){
    //调用父组件传过来的函数，传入 值（输入的文本）
    setCommonReg(item);  
  }
    return (
        // ,drawer?'':{display:'none'} height:Dimensions.get('window').height 
        // <Modal   transparent={true}  onRequestClose={() => {closeDrawer()}} >
          <Animated.View style={[{position:'absolute',left:0,top:0,zIndex:2,width:'100%',height:'100%', overflow:'hidden',flex:1,},{ transform: [getPosition()]}]} visible={show}>
            <TouchableHighlight onPress={()=>closeDrawer()}  underlayColor={'rgba(0,0,0,0.4)'} style={{backgroundColor:'rgba(0,0,0,.6)',width:'100%',height:'100%',position:'absolute',zIndex:2,}} >
              <View></View>
            </TouchableHighlight>
            
            <View style={{height:Dimensions.get('window').height+16,overflow:'scroll',position:"relative",zIndex:3,width:'70%'}}>
            <View style={{alignItems:'center',fontSize:20,backgroundColor: '#f5f5f9',width:'100%',flexDirection:'row',alignItems:'center'}}>
                    <Text style={{fontSize:36,color:'#666',marginLeft:10,width:50,marginTop:-10,}} onPress={()=>{closeDrawer()}}>x</Text><Text style={{fontSize:20,color:'#666'}}>常用正则</Text></View>
            <ScrollView style={{ flex: 1, backgroundColor: '#f5f5f9',width:"100%",}}
                >
                <List>
                    {
                        DATA.map((item, index) => {
                            return (<Item key={item.id} onPress={() => { onSubmitPress(item),closeDrawer() }} style={[{textAlign:'center',minHeight:50,lineHeight:50}]}>{item.title}</Item>)
                        })
                    }
                </List>
            </ScrollView>
            </View>
        
       </Animated.View>
        // </Modal>
       
           
    )

})

Drawers.propTypes = {
    // visible: PropTypes.show, // 控制抽屉显影状态
    // openDrawer: PropTypes.func, // 显示
    // closeDrawer: PropTypes.func, // 影藏
    menuPosition: PropTypes.oneOf(['left', 'right', 'top', 'bottom']), // 抽屉出现的位置
  };
  
  Drawers.defaultProps = {
    // visible: false,
    // openDrawer: () => {},
    // closeDrawer: () => {},
    menuPosition: 'left',
  };

export default Drawers
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})
