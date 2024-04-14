import { useEffect } from "react";
import { Text,View, Dimensions} from "react-native";
import { useAppContext } from "../AppContext";
import AsyncStorage from '@react-native-async-storage/async-storage';

const h= Dimensions.get("window").height;
const w= Dimensions.get("window").width;

const StartScreen=({navigation})=>{
    const {setuser}=useAppContext();

    useEffect(()=>{
        (async ()=>{
          try{
            let tmp=await AsyncStorage.getItem('user');
            if(tmp){
                 tmp=JSON.parse(tmp);
                 get_new_tokens(tmp); 
                }
            else{
              setTimeout(() => {
                navigation.reset({index: 0, routes: [{name: 'Login'}]});
              }, 3000);
            }
          }
          catch(e){alert(e)}
        })();
      },[]);

    const get_new_tokens=(info)=>{
        fetch('http://192.168.1.17:8080/token_update', {method: 'POST',headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({refresh_token:info.refresh_token})})
        .then(response => response.json())
        .then((data) => {
                         if (data.hasOwnProperty("token")){
                          info.token=data.token;
                          info.refresh_token=data.refresh_token;
                          set_new_tokens(info);
                         }
                         else{              
                        setTimeout(() => {
                          navigation.reset({index: 0, routes: [{name: 'Login'}]});
                        }, 3000);}
                        })
        .catch(error => alert('Check your Network'));
    }
    
    const set_new_tokens=(updated_info)=>{
        (async ()=>{
            try{
              await AsyncStorage.setItem('user',JSON.stringify(updated_info));
              setuser(JSON.stringify(updated_info));
              setTimeout(() => {
              navigation.reset({index: 0, routes: [{name: 'Tab Screen',params:{user:updated_info}}]});
            }, 3000);
            }
            catch(e){alert(e)}
          })();
    }

    return (
      <View style={{ flex:1,backgroundColor:"#ffffff",justifyContent:"center",alignItems:"center"}}>
        <Text style={{fontSize:h*0.025}}>Loading App...</Text>
        </View>

    );
}

export default StartScreen;
