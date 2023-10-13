import React, {useState} from 'react'
import {View, Text, TouchableOpacity, FlatList, ScrollView} from 'react-native'

import {PopularDestinationsData} from '../../../data'
import {FlightSearchInputs, SpecialFares, SearchFlightsButton, DisplayRefundDescription, WhyUs} from '../../components'
import {homeStyles} from '../../../styles/main'

const tripTypes = ["ONE WAY", "ROUND TRIP", "MULTICITY"]

const Home = ({ navigation , route }) => {
    const [fromDestination, setFromDestination] = useState(PopularDestinationsData[1])
    const [toDestination, setToDestination] = useState(PopularDestinationsData[0])
    const [activeTabType, setActiveTabType] = useState(tripTypes[0])

    const TripTab = ({ activeTabType, item }) => {
        return (
            <TouchableOpacity 
                activeOpacity={1}
                style={homeStyles.tab(activeTabType, item)}
                onPress={() => { setActiveTabType(item) }}
            >
                <Text style={homeStyles.tabText(activeTabType, item)}> {item} </Text>
            </TouchableOpacity>
        )
    }

    React.useEffect(() => {
        if (route.params?.data) {
            // update destinations data on home screen
            const data = route.params.data
            const focusedField = route.params.focusedField
            focusedField === 'from' && setFromDestination(data)
            focusedField === 'to' && setToDestination(data)

            console.log(data)
        }
    }, [route.params?.data.city, route.params?.data.airport] // [route.params?.data]
    )

    const handleSearchButtonPress = () => {
        if (activeTabType == 'MULTICITY') {
            alert('Search functionality is not supported for Multicity')
            return
        }

        navigation.navigate({
            name: 'Flight Results',
            // params: {from: fromDestination, to: toDestination, activeTab: activeTabType}
        })
    }

    return (
        <ScrollView
            overScrollMode='never'
            showsVerticalScrollIndicator={false}
            style={homeStyles.screen}
        >
            <View style={{alignItems: 'center', margin: 10}}>
                <FlatList
                    data={tripTypes}
                    renderItem={({ item }) => (<TripTab item={item} activeTabType={activeTabType} />)}
                    keyExtractor={item => item}
                    contentContainerStyle={{columnGap: 10, padding: 5}}
                    horizontal
                    style={homeStyles.tripTypesFlatList}
                />
            </View>

            <FlightSearchInputs 
                navigation={navigation} 
                fromDestination={fromDestination} 
                toDestination={toDestination} 
                activeTab={activeTabType} 
                setActiveTab={setActiveTabType}
            />
            <SpecialFares />
            <SearchFlightsButton from={fromDestination} to={toDestination} onClick={handleSearchButtonPress} />
            <DisplayRefundDescription />
            <WhyUs />
        </ScrollView>
    )
}

export default Home