import React from 'react'
import {useEffect} from 'react'
import {View, Text} from 'react-native'

const Splash = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Main')
        }, 1000)
    }, [])

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Splash Screen</Text>
        </View>
    )
}

export default Splash