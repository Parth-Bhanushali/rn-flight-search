import {StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import React from 'react'
import {AntDesign} from '@expo/vector-icons';

import {SHADOWS} from '../../../../constants'

const AppliedFiltersLabel = ({handleOnClose}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>1 Filter applied</Text>

            <TouchableOpacity>
                <AntDesign name="closecircle" size={22} color="black"
                    onPress={handleOnClose} />
            </TouchableOpacity>
        </View>
    )
}

export default AppliedFiltersLabel

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        position: 'absolute',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'gray',
        marginBottom: 24,
        paddingVertical: 8,
        paddingHorizontal: 16,
        bottom: 0,
        ...SHADOWS.light,
    },
    text: {
        marginRight: 16, 
        color: 'black', 
        fontWeight: '500'
    }
})