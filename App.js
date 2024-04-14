import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Contextprovider } from './Screens/AppContext';
import StartScreen from './Screens/Authentication/StartScreen';
import LoginScreen from './Screens/Authentication/LoginScreen';
import SignupScreen from './Screens/Authentication/SignupScreen';
import TabScreen from './Screens/Common/TabScreen';
import MapScreen from './Screens/Common/MapScreen';
import PoolScreen from './Screens/Common/PoolScreen';

const Stack = createNativeStackNavigator();

function App() {

  return (
    <Contextprovider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Start" screenOptions={{headerShown: false}}>
          <Stack.Screen name="Start" component={StartScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Tab Screen" component={TabScreen} />
          <Stack.Screen name="Map Screen" component={MapScreen} />
          <Stack.Screen name="Pool Screen" component={PoolScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  </Contextprovider>

  );
}

export default App;
