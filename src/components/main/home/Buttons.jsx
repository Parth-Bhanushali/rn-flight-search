import {View, Text, TouchableOpacity} from 'react-native'
import React from 'react'
import {StyleSheet} from 'react-native'

import {COLORS, SHADOWS} from '../../../../constants'

var fromDest = ''
var toDest = ''

const handleSearchFlightPress = (activeTab) => {
    alert('Search flights for: ' + fromDest.city + ' > ' + toDest.city + "\n" +
        'Trip type: ' + activeTab)
}

export const SearchFlightsButton = ({from, to, onClick}) => {
    fromDest = from
    toDest = to

    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={onClick}
            style={styles.searchFlightsContainer}>

            <Text style={styles.searchFlightsText}>SEARCH FLIGHTS</Text>
        </TouchableOpacity>
    )
}

export const SwitchButton = ({selectedButton, setSelectedButton}) => {
    function onPress(index) {
        index === 0 ? setSelectedButton('DEPART') :
        index === 1 ? setSelectedButton('RETURN') : false
    }

    return (
        <View style={{alignItems: 'center', paddingBottom: 16}}>
            <View style={styles.switchButtonsContainer}>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => onPress(0)}
                >
                    <Text style={styles.switchText(selectedButton, 'DEPART')}>DEPART</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    activeOpacity={1}
                    onPress={() => onPress(1)}
                >
                    <Text style={styles.switchText(selectedButton, 'RETURN')}>RETURN</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    switchButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center', 
        alignItems: 'center',
        padding: 2, 
        backgroundColor: 'white', 
        borderRadius: 12, 
        borderWidth: 1,
        borderColor: COLORS.lightGray, 
    },
    switchText : (selectedButton, item) => ({
        paddingHorizontal: 16,
        paddingVertical: 8,
        fontWeight: '500',
        fontSize: 13,
        color: selectedButton === item ? 'white' : COLORS.secondary,
        backgroundColor: selectedButton === item ? COLORS.secondary : 'white',
        borderRadius: 10
    }),
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

