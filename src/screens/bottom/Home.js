import {useState} from 'react'
import React from 'react'
import {View, Text, TouchableOpacity, FlatList, ScrollView} from 'react-native'

import {FlightSearchInputs, SpecialFares, SearchFlightsButton, DisplayRefundDescription, WhyUs} from '../../components'
import {homeStyles} from '../../../styles/main'

const tripTypes = ["ONE WAY", "ROUND TRIP", "MULTICITY"]

const Home = ({ navigation }) => {
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

            <FlightSearchInputs />
            <SpecialFares />
            <SearchFlightsButton />
            <DisplayRefundDescription />
            <WhyUs />
        </ScrollView>
    )
}

export default Home