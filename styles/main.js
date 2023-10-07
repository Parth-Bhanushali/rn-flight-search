import {StyleSheet} from 'react-native'

import {COLORS, SHADOWS} from '../constants'

export const homeStyles = StyleSheet.create({
    // root
    screen: {
        backgroundColor: 'white'
    },


    // TripTypes tabs
    tripTypesFlatList: {
        backgroundColor: 'white',
        borderRadius: 4,
        ...SHADOWS.medium
    },
    tab: (activeTabType, item) => ({
        backgroundColor: activeTabType === item ? COLORS.primary : COLORS.white,
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 4
    }),
    tabText: (activeTabType, item) => ({
        color: activeTabType === item ? COLORS.white : COLORS.secondary,
        fontWeight: 'bold',
        fontSize: 12
    })
})
