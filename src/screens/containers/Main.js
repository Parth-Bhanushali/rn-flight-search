import React from 'react'
import {createDrawerNavigator} from '@react-navigation/drawer'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {Entypo, Ionicons, MaterialIcons} from '@expo/vector-icons'
import {StyleSheet} from 'react-native'

import {COLORS, STRINGS, SHADOWS} from '../../../constants'
import {Home, Offers, Bookings, Account, More, FlightResults} from '../'

import {MainDrawer, HeaderLeft, HeaderTitle, HeaderRight} from '../../components'

const Drawer = createDrawerNavigator()
const Tab = createBottomTabNavigator()

const BottomTabNavigator = () => {
    return <Tab.Navigator initialRouteName='Home' screenOptions={screenOptions}>
        <Tab.Screen name='Home' component={Home}
            options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ focused, size, color }) => <Entypo name="home" size={size * 0.95} color={color} />
            }}
        />
        <Tab.Screen name='Offers' component={Offers}
            options={{
                tabBarLabel: 'Offers',
                tabBarIcon: ({ focused, size, color }) => <Entypo name="briefcase" size={size * 0.9} color={color} />
            }}
        />
        <Tab.Screen name='Bookings' component={Bookings}
            options={{
                tabBarLabel: 'Bookings',
                tabBarIcon: ({ focused, size, color }) => <MaterialIcons name="payments" size={size * 1.1} color={color} />
            }}
        />
        <Tab.Screen name='Account' component={Account}
            options={{
                tabBarLabel: 'Account',
                tabBarIcon: ({ focused, size, color }) => <Entypo name="user" size={size * 0.9} color={color} />
            }}
        />
        <Tab.Screen name='More' component={More}
            options={{
                tabBarLabel: 'More',
                tabBarIcon: ({ focused, size, color }) => <Ionicons name="grid" size={size * 0.9} color={color} />
            }}
        />
    </Tab.Navigator>
}

const screenOptions = {
    tabBarShowLabel: true,
    tabBarActiveTintColor: COLORS.primary,
    tabBarInactiveTintColor: COLORS.lightGray,
    headerShown: false,
    tabBarStyle: {
        backgroundColor: COLORS.white,
        height: 57,
        paddingBottom: 5
    },
    tabBarLabelStyle: {
        fontSize: 12.5,
        fontWeight: '500'
    }
}

const Main = () => {
    return (
        <Drawer.Navigator drawerContent={props => <MainDrawer {...props} />}>
            <Drawer.Screen name={STRINGS.appName} options={{
                headerShown: true, 
                headerLeft: (props) => <HeaderLeft {...props}/>,
                headerTitle: (props) => <HeaderTitle {...props} />,
                headerRight: (props) => <HeaderRight {...props}/>,
                headerTitleAlign: 'center',
                headerTitleContainerStyle: styles.headerTitleContainerStyle,
                headerStyle: styles.headerStyle,

            }}
                component={BottomTabNavigator} />
            <Drawer.Screen name='Flight Results' component={FlightResults} options={{headerShown: false}} />
        </Drawer.Navigator>
    )
}

export default Main

const styles = StyleSheet.create({
    headerTitleContainerStyle: {
        // backgroundColor: 'yellow',
        marginVertical: 8, 
        width: '100%', 
        flex:1,
        alignItems: 'center'
    },
    headerStyle: {
        borderBottomColor: COLORS.lightGray, 
        borderBottomWidth: 0.5,
        ...SHADOWS.light
    }
})