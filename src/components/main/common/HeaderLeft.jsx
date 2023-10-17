import {StyleSheet, TouchableOpacity, View} from 'react-native'
import React from 'react'
import {Ionicons} from '@expo/vector-icons'
import {useNavigation} from '@react-navigation/native'

const HeaderLeft = () => {
    const navigation = useNavigation()

    return (
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <View style={styles.iconContainer}>
                <Ionicons name="menu-sharp" size={28} color="black" />
            </View>
        </TouchableOpacity>
    )
}

export default HeaderLeft

const styles = StyleSheet.create({
    iconContainer: {
        paddingLeft: 16
    }
})