import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Routes from './Routes';

// screens
import Home from './Home';

const Stack = createStackNavigator();

const App = (): JSX.Element => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={Routes.home} component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
