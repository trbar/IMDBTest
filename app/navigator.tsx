import * as React from 'react';
import {SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import FavouritesScreen from './favourites/favouritesScreen';
import SearchScreen from './search/searchScreen';
import PosterModalScreen from './common/components/PosterModalScreen';

export type RootStackParamList = {
  TabNavigator: undefined;
  ShowPosterModal: {imageUrl: string};
};

const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName = '';

          if (route.name === 'Favourites') {
            iconName = focused ? 'text-box' : 'text-box-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'text-box-search' : 'text-box-search-outline';
          }

          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
        tabBarActiveTintColor: 'purple',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Favourites" component={FavouritesScreen} />
      <Tab.Screen
        name="Search"
        options={{headerShown: false}}
        component={SearchScreen}
      />
    </Tab.Navigator>
  );
}

export default function Navigator() {
  return (
    <NavigationContainer>
      <SafeAreaView style={{flex: 1}}>
        <RootStack.Navigator>
          <RootStack.Screen
            name="TabNavigator"
            component={TabNavigator}
            options={{header: () => null}}
          />
          <RootStack.Group screenOptions={{presentation: 'modal'}}>
            <RootStack.Screen
              name="ShowPosterModal"
              component={PosterModalScreen}
              options={{header: () => null}}
            />
          </RootStack.Group>
        </RootStack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}
