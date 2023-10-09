import {StyleSheet, View, Text, TouchableOpacity} from 'react-native'
import React from 'react'
import {MaterialIcons, Feather} from '@expo/vector-icons'

import {COLORS} from '../../../../constants'

var navigator = null

const navigateTo = (comingFrom, fromDest, toDest) => {
    navigator.navigate({
        name: 'SelectFlightRoute',
        params: {
            comingFrom: comingFrom,
            fromDestination: fromDest,
            toDestination: toDest
        }
    })
}

const AskToAddReturnDate = () => {
    return (
        <View style={{ position: 'absolute', flexDirection: 'column', justifyContent: 'center', marginTop: 1.5 }}>
            <Text style={{ color: '#007DDC', fontSize: 12, fontWeight: 'bold', paddingLeft: 8 }}>+ ADD RETURN DATE</Text>
            <Text style={{ color: COLORS.secondary, fontSize: 10.5, fontWeight: '600', paddingLeft: 8, marginTop: 0 }}>Save more on round trips!</Text>
        </View>
    )
}

const InputCommon = ({ compName, title, titleDesc, subtitle }) => {
    return (
        <View>
            <Text style={styles.compNameText}>{compName.toUpperCase()}</Text>

            <View style={{
                flexDirection: 'row',
                alignItems: 'baseline',
            }}>
                <Text style={styles.titleText}>{title}</Text>
                <Text style={styles.titleDescText}>{titleDesc}</Text>
            </View>

            {
                subtitle !== undefined
                    ? <Text style={styles.subtitleText}>{subtitle}</Text> : null
            }
        </View>
    )
}

const From = ({fromDestination, toDestination}) => {
    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => {navigateTo('from', fromDestination, toDestination)}}
            style={styles.container}
        >
            <MaterialIcons name='flight-takeoff' size={24} style={styles.iconStyle} />
            <InputCommon compName={'From'} title={fromDestination.city} titleDesc={fromDestination.code} subtitle={fromDestination.airport} />
        </TouchableOpacity>
    )
}

const To = ({fromDestination, toDestination}) => {
    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => {navigateTo('to', fromDestination, toDestination) }}
            style={styles.container}
        >
            <MaterialIcons name='flight-land' size={24} style={styles.iconStyle} />
            <InputCommon compName={'To'} title={toDestination.city} titleDesc={toDestination.code} subtitle={toDestination.airport} />
        </TouchableOpacity>
    )
}

const DepartureDate = () => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialIcons name='date-range' size={24} style={styles.iconStyle} />
            <InputCommon compName={'Departure Date'} title={'06 Oct'} titleDesc={'Fri, 2023'} />
        </View>
    )
}

const ReturnDate = ({ display }) => {
    // show blue button to ask for adding return date (applicable when inside 'one way' tab)
    if (!display) return (
        <View>
            <InputCommon compName={' '} title={' '} titleDesc={' '} />
            <AskToAddReturnDate />
        </View>
    )

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialIcons name='date-range' size={24} style={styles.iconStyle} />
            <InputCommon compName={'Return Date'} title={'07 Oct'} titleDesc={'Sat, 2023'} />
        </View>
    )
}

const TravelersAndClass = () => {
    return (
        <View style={styles.container}>
            <Feather name='user' size={24} style={styles.iconStyle} />
            <InputCommon compName={'Travelers & Class'} title={'1,'} titleDesc={'Economy/Premium Economy'} />
        </View>
    )
}

const FlightSearchInputs = ({navigation, fromDestination, toDestination}) => {
    navigator = navigation
    return (
        <View>
            <From fromDestination={fromDestination} toDestination={toDestination} />
            <To fromDestination={fromDestination} toDestination={toDestination} />

            <View style={styles.splitViewsHolder}>
                <View style={styles.splitViewContainer}>
                    <DepartureDate />
                </View>

                <View style={styles.splitViewContainer}>
                    <ReturnDate display={false} />
                </View>
            </View>

            <TravelersAndClass />
        </View>
    )
}

export default FlightSearchInputs

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.lightestGray,
        padding: 8,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 4,
        borderWidth: 0.8,
        borderColor: 'gray'
    },
    splitViewsHolder: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 8,
        marginHorizontal: 16
    },
    splitViewContainer: {
        width: '50%',
        backgroundColor: COLORS.lightestGray,
        padding: 8,
        marginVertical: 8,
        marginHorizontal: 8,
        borderRadius: 4,
        borderWidth: 0.8,
        borderColor: 'gray',
    },
    iconStyle: {
        color: COLORS.gray,
        marginRight: 8
    },
    compNameText: {
        color: 'gray',
        fontWeight: '500',
        fontSize: 12
    },
    titleText: {
        color: COLORS.black,
        fontWeight: 'bold',
        fontSize: 16
    },
    titleDescText: {
        fontStyle: 'normal',
        fontSize: 11.5,
        marginLeft: 8
    },
    subtitleText: {
        color: 'gray',
        fontWeight: 'regular',
        fontSize: 11
    }
})