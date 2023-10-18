import {StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {MaterialIcons} from '@expo/vector-icons';

import {COLORS} from '../../../../constants'

const Destination = ({item}) => {
    return (
        <View style={{ 
            flex:1,
            flexDirection: 'row',
            alignItems: 'center',
            ...styles.container
        }}>
            <MaterialIcons name="flight-takeoff" size={24} style={styles.iconStyle} />
            
            <View style={{
                flex:1,
                flexDirection: 'column', 
                ...styles.verticalTextsContainer
            }}>
                <Text>{item.city}</Text>
                <Text numberOfLines={1} style={styles.airportName}>{item.airport}</Text>
            </View>
            
            <Text style={{
                alignSelf: 'flex-start', 
                ...styles.destinationCode
            }}>{item.code}</Text>
        </View>
    )
}

export default Destination

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        marginVertical: 2,
        paddingHorizontal: 8,
        backgroundColor: COLORS.white 
    },
    verticalTextsContainer: {
        paddingVertical: 8
    },
    iconStyle: {
        marginRight: 16,
        color: 'gray',
        opacity: 0.7
    },
    airportName: {
        color: 'gray',
        opacity: 0.9,
        fontSize: 12.5
    },
    destinationCode: {
        paddingVertical: 8,
        color: 'gray',
        fontSize: 13,
        fontWeight: '500'
    }
})