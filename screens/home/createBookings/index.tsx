// In App.js in a new project

import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SelectLocation from "./SelectLocation"
import SelectTime from "./SelectTime"

const Stack = createStackNavigator();

function App() {
  return (
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="SelectTime" component={SelectTime} />
      </Stack.Navigator>
  );
}

export default App;