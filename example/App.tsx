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
                <Stack.Screen name={Routes.home} options={{header: () => null}}>
                    {props => <Home {...props} />}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
