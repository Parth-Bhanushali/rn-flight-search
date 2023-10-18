import {View, TouchableOpacity, TouchableWithoutFeedback, StyleSheet} from 'react-native'
import React from 'react'
import {MaterialCommunityIcons} from '@expo/vector-icons'

import {COLORS, SHADOWS} from '../../../../constants'

const FloatingActionButton = (props) => {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View style={{...props.style, ...styles.fab}}>
                <MaterialCommunityIcons name='filter-menu' size={24} color='red' />
                {/* <MaterialCommunityIcons name='filter' size={24} color='white' /> */}
            </View>
        </TouchableWithoutFeedback>
    )
}

export default FloatingActionButton

const styles = StyleSheet.create({
    fab: {
        position: 'absolute', 
        width: 56,
        height: 56,
        borderRadius: 56 / 2,
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 24,
        marginBottom: 24,
        bottom: 0,
        right: 0,
        ...SHADOWS.medium,
        shadowColor: 'black'
    }
})