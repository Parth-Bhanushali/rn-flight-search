import {StyleSheet, View, Text, TouchableOpacity} from 'react-native'
import React, {useCallback, useState} from 'react'
import {MaterialIcons, Feather, Ionicons} from '@expo/vector-icons'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {DatePickerModal, en, registerTranslation} from 'react-native-paper-dates'

import {COLORS} from '../../../../constants'

registerTranslation('en', en) // for paper dates

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

const DepartureDate = ({date}) => {
    const titleValues = getFormattedDateValues(date)

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialIcons name='date-range' size={24} style={styles.iconStyle} />
            <InputCommon compName={'Departure Date'} title={titleValues[0]} titleDesc={titleValues[1]} />
        </View>
    )
}

const ReturnDate = ({date, currentTab}) => {
    // show blue button to ask for adding return date (applicable when inside 'one way' tab)
    if (date === false || date === null || date === undefined || currentTab != 'ROUND TRIP')
        return (
            <View>
                <InputCommon compName={' '} title={' '} titleDesc={' '} />
                <AskToAddReturnDate />
            </View>
        )

    const titleValues = getFormattedDateValues(date)

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialIcons name='date-range' size={24} style={styles.iconStyle} />
            <InputCommon compName={'Return Date'} title={titleValues[0]} titleDesc={titleValues[1]} />
        </View>
    )
}

const TravelersAndClass = () => {
    const handlePressOnTravelers = () => {
        alert('Defaults to :\nNo. of Travelers: 1\nReservation class: Economy\n\nNo further implementation provided.')
    }

    return (
        <TouchableOpacity activeOpacity={1} onPress={handlePressOnTravelers} style={styles.container}>
            <Feather name='user' size={24} style={styles.iconStyle} />
            <InputCommon compName={'Travelers & Class'} title={'1,'} titleDesc={'Economy/Premium Economy'} />
        </TouchableOpacity>
    )
}

const DatePickerView = ({label, date, visible, onDismiss, onConfirm}) => {
    return (
        <DatePickerModal
            locale='en'
            mode='single'
            startYear={2023}
            endYear={2023}
            uppercase='true'
            animationType={'none'}
            saveLabel='Apply'
            label={label}
            validRange={{ startDate: new Date() }}
            date={date}
            visible={visible}
            onDismiss={onDismiss}
            onConfirm={onConfirm}
        />
    )
}

function getFormattedDateValues (date) {
    const tempDateWithTime = date.toString()

    var day = date.getDate()
    
    if (day > 0 && day < 10) {
        day = `0${day}`
    }

    const monthName = tempDateWithTime.split(' ') [1]
    const dayName = tempDateWithTime.split(' ') [0]
    const year = date.getFullYear()

    const title = `${day} ${monthName}`
    const titleDesc = `${dayName}, ${year}`
    return [title, titleDesc]
}

function getNextDayDate (departureDate) {
    var nextDayDate = new Date(departureDate)
    nextDayDate.setDate(nextDayDate.getDate() + 1)
    return nextDayDate
}

const compareDates = (d1, d2) => {
    let date1 = new Date(d1).getTime();
    let date2 = new Date(d2).getTime();
  
    if (date1 < date2) {
      console.log(`${d1} is less than ${d2}`);
      return -1
    } else if (date1 > date2) {
      console.log(`${d1} is greater than ${d2}`);
      return 1
    } else {
      console.log(`Both dates are equal`);
      return 0
    }
};

const FlightSearchInputs = ({
    navigation, fromDestination, toDestination, activeTab, setActiveTab,
    departureDate, setDepartureDate, returnDate, setReturnDate
}) => {
    navigator = navigation

    React.useEffect(() => {
        if (activeTab === 'ONE WAY') {
            // do something when switched to 'one way'
        } else if (activeTab === 'ROUND TRIP') {
            if (returnDate === false || returnDate === null || returnDate === undefined) {
                setReturnDate(getNextDayDate(departureDate))
            }
        } else if (activeTab === 'MULTICITY') {
            // do something when switched to 'multicity'
        }

    }, [activeTab]
    )

    // stateful values for departure date picker
    
    const [openDeparturePicker, setOpenDeparturePicker] = useState(false)
    // stateful values for return date picker
    
    const [openReturnPicker, setOpenReturnPicker] = useState(false)

    const onDismissDepartureDatePicker = useCallback(() => {setOpenDeparturePicker(false)}, [setOpenDeparturePicker])
    const onConfirmDepartureDatePicker = useCallback((params) => {
        setOpenDeparturePicker(false)
        setDepartureDate(params.date)

        if (compareDates(params.date, returnDate) === 1) {
            // setReturnDate(false)
            setReturnDate(getNextDayDate(params.date))
        }

    }, [departureDate, returnDate])


    const onDismissReturnDatePicker = useCallback(() => {setOpenReturnPicker(false)}, [setOpenReturnPicker])
    const onConfirmReturnDatePicker = useCallback((params) => {
        setOpenReturnPicker(false)
        
        if (compareDates(params.date, departureDate) === -1) {
            alert('Return date cannot be prior to departure date.')
            return
        }
        
        setReturnDate(params.date)
        setActiveTab('ROUND TRIP')

    }, [departureDate, returnDate])

    if (activeTab != 'MULTICITY') {
        return (
            <View>
                <From fromDestination={fromDestination} toDestination={toDestination} />
                <To fromDestination={fromDestination} toDestination={toDestination} />

                <View style={styles.splitViewsHolder}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => { setOpenDeparturePicker(true) }}
                        style={styles.splitViewContainer}
                    >
                        <DepartureDate date={departureDate} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => { setOpenReturnPicker(true) }}
                        style={styles.splitViewContainer}>

                        <ReturnDate date={returnDate} currentTab={activeTab} />
                    </TouchableOpacity>

                    {
                        (returnDate != false && returnDate != null && returnDate != undefined && activeTab === 'ROUND TRIP') && (
                            <TouchableOpacity
                                onPress={() => {
                                    setReturnDate(false)
                                    setActiveTab('ONE WAY')
                                }}
                                style={{ alignSelf: 'flex-start', ...styles.returnDateCloseButton }}
                            >
                                <Ionicons name="ios-close-circle-sharp" size={24} color="black" />
                            </TouchableOpacity>
                        )
                    }
                </View>

                <TravelersAndClass />

                <DatePickerView
                    label='Select Departure Date'
                    date={departureDate}
                    visible={openDeparturePicker}
                    onDismiss={onDismissDepartureDatePicker}
                    onConfirm={onConfirmDepartureDatePicker}
                />

                <DatePickerView
                    label='Select Return Date'
                    date={(returnDate === null || returnDate === false) ? getNextDayDate(departureDate) : returnDate}
                    visible={openReturnPicker}
                    onDismiss={onDismissReturnDatePicker}
                    onConfirm={onConfirmReturnDatePicker}
                />
            </View>
        )
    }
    else {
        return (
            <View style={{
                backgroundColor: 'white', 
                flex:1,
                paddingHorizontal: 16,
                paddingVertical: 100
            }}>
                <Text style={{flex:1, alignSelf: 'center', height:'200'}}>
                    Note: 'Multicity' is currently not supported on this project.
                </Text>
            </View>
        )
    }
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
    },
    returnDateCloseButton: {
        marginLeft: -24,
        backgroundColor: 'white'
    }
})