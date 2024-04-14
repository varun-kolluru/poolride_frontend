import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Alert,TouchableOpacity,Text } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import GetLocation from 'react-native-get-location';
import { GOOGLE_API_KEY } from '../../environments';
import MapViewDirections from 'react-native-maps-directions';

const h= Dimensions.get("window").height;
const w= Dimensions.get("window").width;

const MapScreen = ({route,navigation}) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [region, setRegion] = useState(null);
  const [src, setsrc] = useState(null);
  const [des,setdes] = useState(null);
  const [directions,setdirections]=useState(false);
  const mapRef = useRef(null);

  useEffect(() => {
    console.log(route.params)
    if(route.params){
      setsrc(route.params.src);
      setdes(route.params.des);
      setRegion({
        latitude: route.params.src.latitude,
        longitude: route.params.src.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
    else{
    getCurrentLocation();
    }
  }, []);

  const getCurrentLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        setCurrentLocation({
          latitude: location.latitude,
          longitude: location.longitude,
        });
        setRegion({
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      })
      .catch(error => {
        const { code, message } = error;
        console.warn(code, message);
      });
  };

  const handleMapPress = event => {
    const { coordinate } = event.nativeEvent;
    if(!src){
      console.log(coordinate);
      setsrc(coordinate);
    }
    else if(!des){
      setdes(coordinate);
    }
    else{
      Alert.alert("only src and des can be selected");
    }
    
  };

  const markers_clear=()=>{
    setsrc(null);
    setdes(null);
  }

  return (
    <View style={styles.container}>
      {region && (
        <MapView
          ref={mapRef}
          style={{height:h*0.9,width:w*1}}
          initialRegion={region}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          onPress={handleMapPress}>
          {currentLocation && !src && <Marker pinColor='blue' coordinate={currentLocation} title="Current Location" />}
          {src && <Marker pinColor='red' coordinate={src} title="Source"/>}
          {des && <Marker pinColor='green' coordinate={des}  title="Destination"/>}
          {directions &&
          <MapViewDirections
              origin={src}
              destination={des}
              apikey={GOOGLE_API_KEY}
              strokeWidth={3}
              strokeColor="green"
            />
          }
        </MapView>
      )}

      <View style={{flexDirection:"row"}}>
      {src&& des&&
      <TouchableOpacity style={{flex:1,marginHorizontal:h*0.02,backgroundColor:"rgba(56, 149, 211,1)",height:h*0.05,width:w*0.5,justifyContent:"center",alignItems:"center"}} onPress={()=>setdirections(true)}><Text style={{color:"black"}}>show directions</Text></TouchableOpacity>
      }
      {!route.params && src &&
      <TouchableOpacity style={{flex:1,marginHorizontal:h*0.02,backgroundColor:"#cd5c5c",height:h*0.05,width:w*0.5,justifyContent:"center",alignItems:"center"}} onPress={markers_clear}><Text style={{color:"black"}}>Clear markers</Text></TouchableOpacity>
      }
      {!route.params && src && des &&
        <TouchableOpacity style={{flex:1,marginHorizontal:h*0.02,backgroundColor:"green",height:h*0.05,width:w*0.5,justifyContent:"center",alignItems:"center"}} onPress={()=>navigation.goBack()}><Text style={{color:"black"}}>Confirm</Text></TouchableOpacity>
      }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 0.8,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default MapScreen;
