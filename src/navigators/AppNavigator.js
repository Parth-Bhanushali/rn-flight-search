import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import {Splash, Main} from '../screens'
import {FlightResults, SelectFlightRoute} from '../screens'

const Stack = createStackNavigator()

// TODO: To use the splash screen later on, put it above the Main screen's declaration in stack
const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Splash'>
                <Stack.Screen name='Main' component={Main} options={{ headerShown: false }} />
                <Stack.Screen name='Splash' component={Splash} options={{ headerShown: false }} />

                <Stack.Screen name='SelectFlightRoute' options={{headerShown: false, animationEnabled: true}} component={SelectFlightRoute} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator