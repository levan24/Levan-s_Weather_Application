import React from 'react';
import Search from './screens/Search'
import Home from './screens/Home'
// import Clock from './screens/Clock'
import { NavigationContainer } from '@react-navigation/native';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {Dimensions} from 'react-native';

const WIDTH = Dimensions.get('window').width;

const Tab = createMaterialTopTabNavigator();
export default  App = () => {
  return (   
        <NavigationContainer> 
        <Tab.Navigator
          initialRouteName="Home"
          tabBarPosition='bottom'
          swipeEnabled = 'true'
          tabBarOptions={{
            indicatorStyle:{height:0},
            activeTintColor:'#5b8ccd',
            inactiveTintColor: 'grey',
            labelStyle: {
              fontSize: 8
            },
            tabStyle : {
            width: 200,
            height: 50
            },
            style : {   
              position: 'absolute',     
              zIndex: 1, bottom: 0, left: 0,
              backgroundColor: 'transparent', 
              width: WIDTH,             
            },
            showIcon: true
          }}
        >
        <Tab.Screen 
            name="Home" 
            component={Home} 
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
              ),
            }}
          />
        <Tab.Screen 
            name="Search" 
            component={Search} 
            options={{
              tabBarLabel: 'Search',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="city" color={color} size={26} />
              ),
            }}
        />
        </Tab.Navigator>
       </NavigationContainer>
  );
}




        //         <Tab.Screen                           //// მესავე გვერდის გაკეთება გადავიფიქრე. 
        //     name="Clock" 
        //     component={Clock} 
        //     options={{
        //       tabBarLabel: 'Clock',
        //       tabBarIcon: ({ color }) => (
        //        <MaterialCommunityIcons name="clock" color={color} size={26} />
        //       ),
        //     }}
        // />