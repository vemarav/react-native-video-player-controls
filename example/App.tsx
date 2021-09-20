import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Routes from './Routes';

// screens
import Home from './Home';
import Video from './Video';

const Stack = createStackNavigator();

const App = (): JSX.Element => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name={Routes.home}>
                    {props => <Home {...props} />}
                </Stack.Screen>
                <Stack.Screen
                    name={Routes.video}
                    options={{header: () => null}}>
                    {props => <Video {...props} />}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
