import React from 'react'
import {useEffect} from 'react'
import {View, Image, StatusBar, StyleSheet} from 'react-native'
import {COLORS, assets} from '../../../constants'

const Splash = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.replace('Main')   // replace instead of navigate will make sure we don't come back to here due to backpress
        }, 1000)
    }, [])

    return (
        <View style={styles.container}>
            <Image source={assets.app_splash} resizeMode='contain' style={styles.splashImage} />
        </View>
    )
}

export default Splash

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: 'white'
    },
    splashImage: {
        width: '50%', 
        height: '50%', 
        marginBottom:  StatusBar.currentHeight  // to center the splash
    }
})