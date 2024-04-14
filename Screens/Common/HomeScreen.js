import { StyleSheet, Text, View,TouchableOpacity,Platform, StatusBar,SafeAreaView,ScrollView,Image, FlatList, Alert } from 'react-native'
import React from 'react'
import { Dimensions } from 'react-native';
import { useAppContext } from "../AppContext";
import { useEffect,useState } from "react";

const h= Dimensions.get("window").height;
const w= Dimensions.get("window").width;

const HomeScreen=({route,navigation})=>{

  const {user}=useAppContext();
  const [pools,setpools]=useState([]);
  const [tloc_from,settloc_from]=useState(null);
  const [tloc_to,settloc_to]=useState(null);
  const [loc_from,setloc_from]=useState(null);
  const [loc_to,setloc_to]=useState(null);
  const [matchedrequests,setmatchedrequests]=useState(null);


  useEffect(()=>{
    fetch('http://192.168.1.17:8080/requests_get', {method: 'POST',headers: {'Content-Type': 'application/json','Authorization': 'Token '+JSON.parse(user).token},
    body: JSON.stringify({guest:JSON.parse(user).username})})                 /*change this with JSON.parse(user).username*/
    .then(response => response.json()).then((data) =>{
        const array= Object.keys(data["pools_data"]).map(key => ({...data["pools_data"][key]}))
        console.log(array);
        setpools(array);    
    }).catch(error => console.error('Error:', error))
  },[]) 

  const set_loc=()=>{
    if(tloc_from==tloc_to){
      Alert.alert("pick and drop should not be same");
    }
    else if(tloc_from==null){
      Alert.alert("select pick location");
    }
    else if(tloc_to==null){
      Alert.alert("select drop location");
    }
    else{
      fetch('http://192.168.1.17:8080/find_matchedrequests', {method: 'POST',headers: {'Content-Type': 'application/json','Authorization': 'Token '+JSON.parse(user).token},
      body: JSON.stringify({from:loc_from,to:loc_to})})                
      .then(response => response.json()).then((data) =>{
        if(data.hasOwnProperty("requests")){
          setmatchedrequests(data["requests"])
          console.log("matched requests are",data["requests"] );
        }       
      }).catch(error => console.error('Error:', error))

      setloc_from(tloc_from);
      setloc_to(tloc_to);
    }
  }

  const renderpools = ({ item }) => (
    <TouchableOpacity style={{marginVertical:h*0.025,marginHorizontal:w*0.1,width:w*0.8,height:h*0.15,borderRadius:h*0.01,backgroundColor:"#BFD8AF",padding:w*0.025}} onPress={()=>navigation.navigate("Pool Screen",{pool:item})}>
        <View style={{flexDirection:"row"}}>
            <View style={{flex:1,alignItems:"flex-start"}}>
                <Text style={{color:"black",fontWeight:"500",fontSize:h*0.02}}>From</Text>
                <Text numberOfLines={2} ellipsizeMode='tail' style={{color:"black"}}>{item.request.pickup}</Text>
            </View>
            <View style={{flex:1,alignItems:"flex-end"}}>
                <Text style={{color:"black",fontWeight:"500",fontSize:h*0.02}}>To</Text>
                <Text numberOfLines={2} ellipsizeMode='tail' style={{color:"black"}}>{item.request.drop}</Text>
            </View>
        </View>
        <Text style={{textAlign:"center",color:"black",fontWeight:"500",fontSize:h*0.02,marginTop:h*0.01}}>{item.request.trip_datetime}</Text>
        <Text style={{color:"black",textAlign:"center"}}>(Filled : {item.request.filled}/{item.request.capacity})</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{flex: 1,backgroundColor:"#4F6F52",paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0}}> 
      <ScrollView>
      <Text style={{paddingHorizontal:w*0.025,fontSize:h*0.03,color:"black",fontWeight:"600"}}>Your Ride Pools</Text>
        {pools.length>0?
          <FlatList horizontal={true} showsHorizontalScrollIndicator={true} pagingEnabled data={pools} renderItem={renderpools} keyExtractor={(item,index) => index}/> 
          :
          <Text style={{fontSize:h*0.023,color:"black",alignSelf:"center",marginVertical:h*0.025}}>You not in any pool yet!</Text>
        }
        <View style={{paddingHorizontal:w*0.025,backgroundColor:"#ffffff",height:h*0.8,borderTopLeftRadius:h*0.05,borderTopRightRadius:h*0.05}}>
        { (loc_from==null || loc_to==null) &&
          <>
          <Text style={{color:"black",fontWeight:"500",fontSize:h*0.025,marginTop:h*0.05}}>Select your Trip Route</Text>
          <TouchableOpacity style={{marginVertical:h*0.025}} onPress={()=> navigation.navigate("Map Screen")}>
            <Image style={{height:h*0.25,width:w*0.85,alignSelf:"center"}} source={require('../../assets/Pics/Maps_image.png')}/>
          </TouchableOpacity>
          <Text style={{fontSize:h*0.02,color:"black",alignSelf:"center",marginHorizontal:w*0.05}}>
            Your route matching requests will apear after you select your route
          </Text>
          </> 
        }
          <Text style={{fontSize:h*0.025,fontWeight:"400",alignSelf:"center",marginVertical:h*0.025,color:"black"}}>Or</Text>
          <TouchableOpacity style={{borderRadius:h*0.025,height:h*0.07,width:w*0.5,backgroundColor:"#BFD8AF",justifyContent:"center",alignSelf:"center",alignItems:"center"}} >
            <Text style={{color:"black",fontSize:h*0.023,fontWeight:"400"}}>Create New pool</Text>
          </TouchableOpacity>
        
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})

export default HomeScreen;