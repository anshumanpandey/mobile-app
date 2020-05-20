/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, {useEffect} from 'react'


import * as eva from '@eva-design/eva';
import EvaMapping from '@eva-design/eva/mapping';
import { ApplicationProvider } from '@ui-kitten/components';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import './utils/AxiosBootstrap';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Home from './screens/home/Home';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import { useGlobalState } from './state';
//@ts-ignore
import { default as mapping } from './mapping.json';
import SplashScreen from 'react-native-splash-screen'

const Stack = createStackNavigator();


export default () => {
  const [token] = useGlobalState('token');

  useEffect(() => {
    SplashScreen.hide()
  }, []);
  const j = { ...EvaMapping }
  j.strict["text-font-family"] = "SF-UI-Display-Regular"
  j.components.Input.appearances.default.variantGroups.status.basic.state.focused.borderColor = '#41D5FB'

  return (
    <ApplicationProvider mapping={EvaMapping} theme={eva.light} customMapping={j}>
      <NavigationContainer>
        <Stack.Navigator headerMode='none'>
          {token ? (
            <>
              <Stack.Screen name="Home" component={Home} />
            </>
          ) : (
              <>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Signup" component={Signup} />
                <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
              </>
            )}


        </Stack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
  )
};
