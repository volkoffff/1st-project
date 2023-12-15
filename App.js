import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Pokemons } from './src/Pages/Pokemons';
import { Settings } from './src/Pages/Settings';

function PokemonsScreen() {
  return (
    <Pokemons />
  );
}

function SearchScreen() {
  return (
    <Pokemons />
  );
}

function SettingsScreen() {
  return (
    <Settings />
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Pokemons" component={PokemonsScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
