import {Text, TouchableOpacity} from 'react-native'
import React from 'react'
import {StyleSheet} from 'react-native'

import {COLORS, SHADOWS} from '../../../../constants'

var fromDest = ''
var toDest = ''

const handleSearchFlightPress = () => {
    alert('Search flights for: ' + fromDest.city + ' > ' + toDest.city)
}

export const SearchFlightsButton = ({from, to}) => {
    fromDest = from
    toDest = to

    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={handleSearchFlightPress}
            style={styles.searchFlightsContainer}>

            <Text style={styles.searchFlightsText}>SEARCH FLIGHTS</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    searchFlightsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: 50,
        padding: 10,
        borderRadius: 4,
        backgroundColor: COLORS.primary,
        ...SHADOWS.medium
    },
    searchFlightsText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14
    }
})

