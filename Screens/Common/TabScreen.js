import React,{useEffect,useState} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { useAppContext } from '../AppContext';
import { Dimensions } from 'react-native';
import HomeScreen from './HomeScreen';
import AnalysisScreen from './AnalysisScreen';
import AccountScreen from './AccountScreen';

const h= Dimensions.get("window").height;
const w= Dimensions.get("window").width;
const Tab = createBottomTabNavigator();

const TabScreen = ({route}) => {
return (
    <Tab.Navigator initialRouteName='Home'  screenOptions={{headerShown: false, tabBarActiveTintColor: '#4F6F52'}}>
      <Tab.Screen name="Home" component={HomeScreen} initialParams={{}} options={{tabBarIcon: ({ color, size }) => (<Icon name="home" size={size} color={color} />)}}/>
      <Tab.Screen name="Hystory Analysis" component={AnalysisScreen} initialParams={{}} options={{tabBarIcon: ({ color, size }) => (<IonIcon name="analytics-outline" size={size} color={color} />)}}/>
      <Tab.Screen name="Account" component={AccountScreen} initialParams={{}} options={{tabBarIcon: ({ color, size }) => (<Icon name="user-circle-o" size={size} color={color} />)}}/>
    </Tab.Navigator>
  );
};

export default TabScreen;