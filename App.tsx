/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react'
import { Component } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import './utils/AxiosBootstrap';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Home from './screens/home/Home';
import { useGlobalState } from './state';

const Stack = createStackNavigator();

export default () => {
  const [token] = useGlobalState('token');
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        <Stack.Navigator headerMode='none'>
          {token ? (
            <>
              <Stack.Screen name="Home" component={Home} />
            </>
          ) : (
              <>
                <Stack.Screen name="Signup" component={Signup} />
                <Stack.Screen name="Login" component={Login} />
              </>
            )}


        </Stack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
  )
};
