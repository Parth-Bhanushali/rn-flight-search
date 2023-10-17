import React, {useState} from 'react'
import {View, Text, Image, TouchableOpacity, FlatList, StyleSheet} from 'react-native'
import {Ionicons, MaterialIcons, Octicons, MaterialCommunityIcons, Fontisto} from '@expo/vector-icons'; 

import {FloatingActionButton, PriceFilterModal, AppliedFiltersLabel} from '../../components'
import {COLORS, SHADOWS, assets} from '../../../constants';
import {FlightsSchedule} from '../../../data';
import {SwitchButton} from '../../components';

var navigator = null
var fromDestination = null
var toDestination = null
var departureDate = null
var returnDate = null
var tripType = null

const handleBack = () => {
    navigator.goBack()
}

const handleEdit = () => {
    alert('Edit clicked:\nThis action is currently not provided with implementation.')
}

function getFormattedDateValues (date) {
    const tempDateWithTime = date  // string
    const dateObj = new Date(date)  // date object

    var day = dateObj.getDate()
    
    if (day > 0 && day < 10) {
        day = `0${day}`
    }

    const monthName = tempDateWithTime.split(' ') [1]
    const dayName = tempDateWithTime.split(' ') [0]
    const year = dateObj.getFullYear()

    const title = `${day} ${monthName}`
    const titleDesc = `${dayName}, ${year}`
    return [title, titleDesc]
}

function getFormattedDateForSearchHeader () {
    let finalDate = ''
    if (returnDate === null || returnDate === false || returnDate === undefined) {
        finalDate = getFormattedDateValues(departureDate) [0]
    } else {
        finalDate = getFormattedDateValues(departureDate)[0] + ' - ' + getFormattedDateValues(returnDate)[0]
    }
    return finalDate
}

const SearchHeader = () => {
    const dateForSubtitle = getFormattedDateForSearchHeader()
    return (
        <View style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            ...styles.searchHeaderBackground
            }}
        >
            <TouchableOpacity onPress={handleBack}>
                <Ionicons name="arrow-back-sharp" size={24} color="black" />
            </TouchableOpacity>

            <View style={{ marginLeft: 16, alignSelf: 'flex-start', flex: 1 }}>
                <Text style={styles.searchHeaderTitle}>{fromDestination.city} to {toDestination.city}</Text>
                <Text style={styles.searchHeaderSubtitle}>{dateForSubtitle} | 1 Adult | Economy</Text>
            </View>

            <TouchableOpacity onPress={handleEdit}>
                <MaterialIcons name="edit" size={24} color="black" 
                    style={{ justifyContent: 'flex-end' }} />
            </TouchableOpacity>
        </View>
    )
}

const ArrowBetweenCodes = ({roundtrip}) => {
    if (roundtrip) {
        return <Fontisto name="arrow-swap" size={16} color="black"
            style={{ marginHorizontal: 8, paddingTop: 2 }} />
    } else {
        return <MaterialIcons name="arrow-right-alt" size={24} color="black"
            style={{ marginHorizontal: 4, paddingTop: 1 }} />
    }
}

const MainHeader = ({dataLength, returnDataLength, selectedButton}) => {
    let visibleDataLength = 0
    if (tripType === 'ONE WAY') {
        visibleDataLength = dataLength
    } else if (tripType === 'ROUND TRIP') {
        if (selectedButton === 'DEPART') {
            visibleDataLength = dataLength
        } else if (selectedButton === 'RETURN') {
            visibleDataLength = returnDataLength
        }
    }

    return (
        <View style={styles.mainHeaderContainer}>
            <SearchHeader />

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View>
                    <Text style={{ alignSelf: 'flex-start', ...styles.mainHeaderTitle }}>Available Flights</Text>
                    <Text style={{ alignSelf: 'flex-start', ...styles.mainHeaderSubtitle }}>{visibleDataLength} results found</Text>
                </View>

                <View style={{ marginRight: 20, alignItems: 'center', flexDirection: 'row' }}>
                    <Text style={styles.cityCodeText}>{fromDestination.code}</Text>
                    <ArrowBetweenCodes roundtrip={tripType === 'ROUND TRIP'} />
                    <Text style={styles.cityCodeText}>{toDestination.code}</Text>
                </View>
            </View>
        </View>
    )
}

const ListItem = ({item, reverseDest}) => {
    const onTimePercent = item.percentOnTime != 'NA' ? item.percentOnTime : null
    const stopsText = item.stops === "0" ? 'Non stop' :
                        item.stops === "1" ? `${item.stops} stop` : `${item.stops} stops`

    const sourceText = reverseDest ? toDestination.city : fromDestination.city
    const destinationText = reverseDest? fromDestination.city : toDestination.city

    return (
        <View style={styles.listItemBackground}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                    <Image source={item.image} style={styles.listItemCompanyLogo} />
                    <Text style={styles.listItemCompanyName}>{item.airline}</Text>
                </View>

                {
                    onTimePercent != null &&
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcons name="clock-fast" size={18} color="gray" />
                        <Text style={styles.listItemOnTime}>{onTimePercent}% on time</Text>
                    </View>
                }
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 16}}>
                <View style={{alignItems: 'flex-start'}}>
                    <Text style={styles.listItemTimeAndPrice}>{item.source_time}</Text>
                    <Text style={{fontSize: 10}}>{sourceText}</Text>
                </View>

                <View style={{alignItems: 'center'}}>
                    <Text style={styles.listItemFlightDuration}>{item.duration}</Text>
                    
                    {
                        item.stops === '0' ?
                            <Image source={assets.line} style={styles.listItemLine} />
                            :
                            <Image source={assets.line_and_dot} style={styles.listItemLineWithDot} />
                    }
                    
                    <Text style={styles.listItemFlightStopsText}>{stopsText}</Text>
                </View>

                <View style={{alignItems: 'center'}}>
                    <Text style={styles.listItemTimeAndPrice}>{item.destination_time}</Text>
                    <Text style={styles.listItemSubLocation}>{destinationText}</Text>
                </View>

                <View style={{alignItems: 'flex-end'}}>
                    <Text style={styles.listItemTimeAndPrice}>₹ {item.cost}</Text>
                    <Text style={{...styles.listItemSubLocation, color: 'gray'}}>per adult</Text>
                </View>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center',  marginTop: 16}}>
                <Octicons name="dot-fill" size={14} color="orange" />
                <Text style={{
                    ...styles.listItemPromotionalLabel,
                    includeFontPadding: true, 
                    marginBottom: 1
                }}>Use HDFCEMI to get FLAT 1000 OFF* on HDFC cards EMI; Get Rs. 200 off using  BMFBONUS*</Text>
            
            </View>
        </View>
    )
}

const PromoListHeader = () => {
    return (
        <View style={{ ...styles.listHeaderContainer, alignItems: 'center', flexDirection: 'row' }}>
            <Image source={assets.diwaliLogo} style={styles.listHeaderImage} />
            <View style={{ marginLeft: 16, flex: 1 }}>
                <Text style={{ fontWeight: 'bold', marginBottom: -12 }}>FLAT 15% OFF*</Text>
                <Octicons name="dash" color="red" size={30} style={{ marginLeft: 1, marginBottom: -12 }} />
                <Text style={{ fontSize: 13, flexWrap: 'wrap' }}>on Domestic Flights for Festive Seasion Trips! Use Code: BMF-ONECARDEMI</Text>
            </View>
        </View>
    )
}

const LabelNoDataWithMatchingFilter = () => {
    return (
        <View style={{ backgroundColor: COLORS.lighterGray, alignItems: 'center', flex: 10 }}>
            <Text style={styles.infoTextNoFilterMatchResult}
            >No flights found matching this filter</Text>
        </View>
    )
}

const FlightResults = ({ navigation, route }) => {
    navigator = navigation
    fromDestination = route.params.from
    toDestination = route.params.to
    departureDate = route.params.depDate
    returnDate = route.params.retDate
    tripType = route.params.activeTab

    const sampleData = FlightsSchedule[0].one    // use for one way or for depart if round trip 
    const sampleData2 = FlightsSchedule[0].two   // use for return
    
    const [data, setData] = useState(sampleData)
    const [returnData, setReturnData] = useState(sampleData2)
    const [filterModalVisible, setFilterModalVisible] = useState(false)
    const [sliderValue, setSliderValue] = useState(6000)
    const [showAppliedFilters, setShowAppliedFilters] = useState(false)
    const [selectedButton, setSelectedButton] = useState('DEPART')

    const handleFabPress = () => {
       setFilterModalVisible(true)
    }

    function removeFilters() {
        setShowAppliedFilters(false)

        setData(sampleData)
        setReturnData(sampleData2)
    }

    function onApplyChanges() {
        setFilterModalVisible(false)
        setShowAppliedFilters(true)

        setData(sampleData.filter(item => item.cost <= sliderValue))
        setReturnData(sampleData2.filter(item => item.cost <= sliderValue))
    }

    return (
        <View style={{flex: 1}}>        
            <MainHeader dataLength={data.length} returnDataLength={returnData.length} selectedButton={selectedButton} />

            <FlatList
                data={tripType === 'ONE WAY' ? data : selectedButton === 'DEPART' ? data : selectedButton === 'RETURN' ? returnData : null}
                renderItem={({item}) => <ListItem item={item} reverseDest={tripType === 'ROUND TRIP' && selectedButton === 'RETURN'} />}
                keyExtractor={item => item.id}
                overScrollMode='never'
                style={{backgroundColor: COLORS.lighterGray}}
                contentContainerStyle={{rowGap: 10, paddingTop: 12, paddingBottom: 16}}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={() => {
                    return (
                        <View>
                            {
                                tripType === 'ROUND TRIP' &&
                                <SwitchButton
                                    selectedButton={selectedButton}
                                    setSelectedButton={setSelectedButton}
                                />
                            }
                            <PromoListHeader />
                        </View>
                    )
                }}
            />

            {
                tripType === 'ONE WAY' &&
                data.length === 0 &&
                <LabelNoDataWithMatchingFilter />
            }

            {
                tripType === 'ROUND TRIP' &&
                selectedButton === 'DEPART' &&
                data.length === 0 &&
                <LabelNoDataWithMatchingFilter />
            }

            {
                tripType === 'ROUND TRIP' &&
                selectedButton === 'RETURN' &&
                returnData.length === 0 &&
                <LabelNoDataWithMatchingFilter />
            }

            <PriceFilterModal
                filterModalVisible={filterModalVisible}
                setFilterModalVisible={setFilterModalVisible}
                sliderValue={sliderValue}
                setSliderValue={setSliderValue}
                onApplyChanges={onApplyChanges}
            />            

            <FloatingActionButton
                onPress={handleFabPress}
                style={{
                    // backgroundColor: 'red', 
                    backgroundColor: 'white', 
                }} 
            />

            {
                showAppliedFilters === true &&
                <AppliedFiltersLabel handleOnClose={removeFilters}/>
            }
        </View>
    )
}



export default FlightResults

const styles = StyleSheet.create({
    mainHeaderContainer: {
        backgroundColor: 'white',
        borderRadius: 1, 
        borderBottomWidth: 1, 
        borderColor: COLORS.lightGray,
        ...SHADOWS.dark, 
    },
    mainHeaderTitle: {
        marginLeft: 18, 
        marginTop: 8, 
        marginBottom: 2, 
        fontWeight: '300',
        fontSize: 20
    },
    mainHeaderSubtitle: {
        marginLeft: 18, 
        marginBottom: 8, 
        color: 'gray',
        fontWeight: '400', 
        fontSize: 13
    },
    cityCodeText: {
        fontSize:14
    },
    searchHeaderBackground: {
        backgroundColor: COLORS.lightestGray,
        paddingVertical: 8, 
        paddingHorizontal: 16, 
        marginVertical: 8, 
        marginHorizontal: 16, 
        borderRadius: 4,
        borderWidth: 0.8,
        borderColor: COLORS.lightGray
    },
    searchHeaderTitle: {
        fontWeight: 'bold',
        fontSize: 16
    },
    searchHeaderSubtitle: {
        fontSize: 12
    },
    listHeaderContainer: {
        backgroundColor: 'white',
        padding: 8,
        marginHorizontal: 16, 
    },
    listHeaderImage: {
        width: 60,
        height: 60
    },
    listItemBackground: {
        backgroundColor: 'white',
        marginHorizontal: 8, 
        paddingHorizontal: 16, 
        paddingVertical: 8
    },
    listItemCompanyLogo: {
        width: 20,
        height: 20
    },
    listItemCompanyName: {
        marginLeft: 8, 
        fontWeight: '500'
    },
    listItemOnTime: {
        marginLeft: 4, 
        marginBottom:2, 
        color: 'gray',
        fontWeight: 'regular', 
        fontSize: 12 
    },
    listItemTimeAndPrice: {
        fontWeight: 'bold', 
        fontSize: 16
    },
    listItemSubLocation: {
        fontSize: 10, 
        paddingLeft: 3
    },
    listItemPromotionalLabel: {
        color:COLORS.gray, 
        paddingLeft: 8, 
        fontWeight: '400',
        fontSize: 10,
    },
    listItemFlightDuration: {
        paddingBottom: 4,
        fontWeight: '400', 
        fontSize: 11
    },
    listItemFlightStopsText: {
        paddingTop: 3, 
        color: 'gray',
        fontWeight: '400', 
        fontSize: 11
    },
    listItemLine: {
        width: 60, 
        height:2.5, 
        tintColor: 'green'
    },
    listItemLineWithDot: {
        width: 60,
        height: 2.5
    },
    infoTextNoFilterMatchResult: {
        color: COLORS.darkGray,
        fontSize: 16,
        fontWeight: '500'
    }
})