import { StyleSheet, View, TouchableOpacity } from 'react-native'
import React from 'react'
import {MaterialIcons, Feather} from '@expo/vector-icons'

const onLanguageIconPress = () => {
    alert('Display list of languages to choose from.\nFunctionality not implemented.')
}

const onOptionsIconPress = () => {
    alert('Display context menu for more available actions.\nFunctionality not implemented.')
}

const HeaderRight = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onLanguageIconPress}>
                <View style={styles.iconContainer}>
                    <MaterialIcons name="g-translate" size={24} color="black" />
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={onOptionsIconPress}>
                <View style={styles.iconContainer}>
                    <Feather name="more-vertical" size={22} color="black" />
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default HeaderRight

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center',
    },
    iconContainer: {
        marginRight: 16
    }
})