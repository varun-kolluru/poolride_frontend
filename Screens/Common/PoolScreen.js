import { StyleSheet, Text, View,TouchableOpacity,Platform, StatusBar,SafeAreaView,ScrollView,Image, FlatList, Alert } from 'react-native'
import React from 'react'
import { Dimensions } from 'react-native';
import { useAppContext } from "../AppContext";
import { useEffect,useState } from "react";
import Icon from 'react-native-vector-icons/FontAwesome';

const h= Dimensions.get("window").height;
const w= Dimensions.get("window").width;

const PoolScreen=({route,navigation})=>{
    const pool=route.params.pool;
    const {user}=useAppContext();
    const src={latitude:parseFloat(pool.request.pickup.split(',')[0]),longitude:parseFloat(pool.request.pickup.split(',')[1])};
    const des={latitude:parseFloat(pool.request.drop.split(',')[0]),longitude:parseFloat(pool.request.drop.split(',')[1])};

  useEffect(()=>{
   console.log(src,des);
  },[])

  return (
    <SafeAreaView style={{flex: 1,backgroundColor:"#BFD8AF",paddingHorizontal:w*0.025,paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0}}> 
        <Text style={{color:"black",fontWeight:"500",fontSize:h*0.025}}>Trip Route</Text>
        <TouchableOpacity style={{marginVertical:h*0.025}} onPress={()=> navigation.navigate("Map Screen",{src:src,des:des})}>
          <Image style={{height:h*0.125,width:w*0.85,alignSelf:"center",borderRadius:h*0.025}} resizeMode='stretch' source={require('../../assets/Pics/Maps_route.png')}/>
        </TouchableOpacity>
        <View style={{flexDirection:"row",height:h*0.05,width:w*0.85,alignSelf:"center"}}>
            <View style={{flex:1,alignItems:"flex-start"}}>
                <Text style={{color:"black",fontWeight:"500",fontSize:h*0.02}}>From</Text>
                <Text style={{color:"black"}}>{pool.request.pickup}</Text>
            </View>
            <View style={{flex:1,alignItems:"flex-end"}}>
                <Text style={{color:"black",fontWeight:"500",fontSize:h*0.02}}>To</Text>
                <Text style={{color:"black"}}>{pool.request.drop}</Text>
            </View>
        </View>
        <Text style={{textAlign:"center",color:"black",fontWeight:"500",fontSize:h*0.02,marginVertical:h*0.025}}>Date Time of Trip: 23-10-2024 13:45</Text>

        <Text style={{color:"black",fontWeight:"500",fontSize:h*0.02,marginVertical:h*0.025}}>Pool Members  {pool.request.filled}/{pool.request.capacity}</Text>
        {pool.guests.some(guest => guest.username === JSON.parse(user).username)  ?
        <>
        <ScrollView contentContainerStyle={{paddingBottom:h*0.05}}>
            {pool.guests.map((item,index)=>(
              <TouchableOpacity key={index} style={{paddingHorizontal:w*0.025,marginBottom:h*0.015,height:h*0.075,backgroundColor:"rgba(255,255,255,0.5)",justifyContent:"center"}}>
                <Text key={index} style={{color:"black"}}>{index+1}.) {item.username}</Text>
              </TouchableOpacity>
            ))}
        </ScrollView>
        <TouchableOpacity style={{flexDirection:"row",alignSelf:"center",height:h*0.05,width:w*0.4,backgroundColor:"#4F6F52",marginTop:h*0.025,marginBottom:h*0.2,justifyContent:"center",borderRadius:h*0.025}}>
            <Text style={{flex:1,color:"rgba(255,255,255,0.8)",fontWeight:"400",fontSize:h*0.02,textAlign:"right",textAlignVertical:"center"}}>Chat</Text>
            <Icon style={{flex:1,fontSize:h*0.035,textAlignVertical:"center",textAlign:"center",color:"rgba(255,255,255,0.5)"}} name="wechat" />
        </TouchableOpacity>
        </>
        :
        <View style={{height:h*0.3,alignItems:"center",justifyContent:"center"}}>
            <Text style={{color:"black",fontSize:h*0.02}}>Join This pool to get Details of poolmates and chat access with them</Text>
        </View>

        }

    </SafeAreaView>

  )
}

const styles = StyleSheet.create({})

export default PoolScreen;