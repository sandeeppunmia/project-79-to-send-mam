import React from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';
import SignUpLoginScreen from './screens/SignUpLoginScreen';
import HomeScreen from './screens/HomeScreen';
import { createAppContainer ,createSwitchNavigator} from 'react-navigation';
import ExchangeScreen from './screens/ExchangeScreen';
import {createBottomTabNavigator} from 'react-navigation-tabs';

export default function App() {
  return (
    <AppContainer/>
  );
}

const TabNavigator = createBottomTabNavigator({
  HomeScreen:{
    screen:HomeScreen
  },
  ExchangeScreen:{
    screen:ExchangeScreen
  }},

  {
    defaultNavigationOptions:({navigation})=>({
      tabBarIcon: ()=>{
      const routeName = navigation.state.routeName
      if(routeName==='HomeScreen'){
        return(
          <Image source={require("./assets/home.png")}
                      style={{width:20,height:20}}/>,
          tabBarLabel="Home"
        )
      }else if(routeName==='ExchangeScreen'){
        return(
        <Image source={require("./assets/exchange.png")}
                      style={{width:20,height:20}}/>
        
        )
      }
    }
  })
  }
)


const switchNavigator = createSwitchNavigator({
  SignUpLoginScreen:{
    screen:SignUpLoginScreen
  },
  BottomTab:{
    screen:TabNavigator
  },
})

const AppContainer = createAppContainer(switchNavigator);