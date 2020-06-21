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
import TwitterLoginScreen from './screens/TwitterLoginWebview';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import VerifyPhoneScreen from './screens/VerifyPhoneScreen';
import VerifyEmailScreen from './screens/VerifyEmailScreen';
import { useGlobalState, dispatchGlobalState } from './state';
import SplashScreen from 'react-native-splash-screen'
import { Alert } from 'react-native';

const Stack = createStackNavigator();


export default () => {
  const [profile] = useGlobalState('profile');
  const [error] = useGlobalState('error');

  useEffect(() => {
    SplashScreen.hide()
    if (profile && !profile.verifies) {
      // TODO: we cannot pass null since async storage cannot handle it, we should delete this block since we don't need this check anymore
      // as long as users has the most current version on their phone with not old data stored
      dispatchGlobalState({ type: 'token', state: null })
      dispatchGlobalState({ type: 'profile', state: null })
    }
  }, []);
  const j = { ...EvaMapping }
  j.strict["text-font-family"] = "SF-UI-Display-Regular"
  j.components.Input.appearances.default.variantGroups.status.basic.state.focused.borderColor = '#41D5FB'
  j.components.Input.appearances.default.variantGroups.status.basic.backgroundColor = "white"

  j.components.Input.appearances.default.variantGroups.status.basic.state.focused.borderColor = '#41D5FB'
  j.components.Input.appearances.default.variantGroups.status.basic.backgroundColor = "white"

  j.components.CheckBox.appearances.default.variantGroups.status.basic.backgroundColor = "white"
  j.components.CheckBox.appearances.default.variantGroups.status.basic.borderColor = "#E4E9F2"
  j.components.CheckBox.appearances.default.variantGroups.status.basic.state.checked.backgroundColor = "#41D5FB"
  j.components.CheckBox.appearances.default.variantGroups.status.basic.state.checked.borderColor = "#41D5FB"
  j.components.CheckBox.appearances.default.variantGroups.status.basic.state.focused.borderColor = "#41D5FB"
  j.components.CheckBox.appearances.default.variantGroups.status.basic.state.focused.backgroundColor = "#41D5FB"
  j.components.CheckBox.appearances.default.variantGroups.status.basic.state.active.backgroundColor = "#41D5FB"
  j.components.CheckBox.appearances.default.variantGroups.status.basic.state.active.borderColor = "#41D5FB"
  j.components.CheckBox.appearances.default.variantGroups.status.basic.state["checked.active"].backgroundColor = "#41D5FB"
  j.components.CheckBox.appearances.default.variantGroups.status.basic.state["checked.active"].borderColor = "#41D5FB"

  if (error) {
    Alert.alert(
      "Error",
      error,
      [
        { text: "Close", onPress: () => dispatchGlobalState({ type: 'error', state: null }) }
      ],
      { cancelable: false }
    );
  }

  return (
    <ApplicationProvider mapping={EvaMapping} theme={eva.light} customMapping={j}>
      <NavigationContainer>
        <Stack.Navigator headerMode='none'>
          {(profile && profile.vphone == 1 && profile.vemail == 1) && (
            <>
              <Stack.Screen name="Home" component={Home} />
            </>
          )}

          {(!profile || profile.vphone != 1 || profile.vemail != 1) && (
              <>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Signup" component={Signup} />
                <Stack.Screen name="TwitterLogin" component={TwitterLoginScreen} />
                <Stack.Screen name="Opt" component={VerifyPhoneScreen} />
                <Stack.Screen name="VerifyEmail" component={VerifyEmailScreen} />
                <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
              </>
            )}


        </Stack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
  )
};
