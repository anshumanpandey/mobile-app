// In App.js in a new project

import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SelectTime from "./SelectTime"
import CarsListScreen from "./CarsListScreen"

const Stack = createStackNavigator();

function App() {
  return (
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="SelectTime" component={SelectTime} />
        <Stack.Screen name="CarsList" component={CarsListScreen} />
      </Stack.Navigator>
  );
}

export default App;