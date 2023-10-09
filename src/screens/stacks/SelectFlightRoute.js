import {StyleSheet, Keyboard, Text, View, TextInput, TouchableOpacity} from 'react-native'
import React, {useState} from 'react'
import {Ionicons, MaterialIcons} from '@expo/vector-icons';

import {COLORS} from '../../../constants'
import {PopularDestinationsData, RecentDestinationsData} from '../../../data'
import {LocationList} from '../../components';


const InputCommon = ({ compName, title, titleDesc, subtitle }) => {
    return (
        <View style={{ flexDirection: 'row', flex: 1 }}>
            <View>
                <Text style={styles.compNameText}>{compName.toUpperCase()}</Text>

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'baseline',
                }}>
                    <Text style={styles.titleText}>{title}</Text>
                    <Text style={styles.titleDescText}>{titleDesc}</Text>
                </View>
            </View>


            {
                subtitle.length !== 0 &&
                    <Text numberOfLines={1} style={{
                        flex: 1,
                        alignSelf: 'flex-end',
                        ...styles.subtitleText
                    }}>{subtitle}</Text>
            }
            
        </View>
    )
}

const InputCommonFocused = ({ compName, onSearch }) => {
    return (
        <View style={{ flexDirection: 'row', flex: 1, height: 40 }}>
            <View style={{flex:1}}>
                <Text style={{
                    ...styles.compNameText,
                    color: 'black'
                }}>{compName.toUpperCase()}</Text>

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'baseline',
                }}>
                    <SearchInput onSearch={onSearch} />
                </View>
            </View>
        </View>
    )
}

const SearchInput = ({onSearch}) => {
    return (
        <View style={{flex:1, width: '100%', flexDirection: 'column'}}>
            <TextInput
                autoFocus={true}
                placeholder='Enter any City/Airport names'
                placeholderTextColor='gray'
                style={{fontSize: 16}}
                onChangeText={onSearch}
            />
        </View>
    )
}

const SelectFlightRoute = ({ navigation, route }) => {
    const comingFrom = route.params.comingFrom
    const fromDest = route.params.fromDestination
    const toDest = route.params.toDestination

    const [isFromFocused, setIsFromFocused] = useState(comingFrom === 'from')
    const [isToFocused, setIsToFocused] = useState(comingFrom === 'to')

    const [listHeaderTitle, setListHeaderTitle] = useState('RECENT SEARCHES')
    const [listData, setListData] = useState(RecentDestinationsData)

    const [noSuggestionsDisplay, setNoSuggestionsDisplay] = useState(false)
    

    const handleSearch = (value) => {
        if (!value.length) {
            // show recent searches and popular cities - 2 flatlists
            return showRecentSearches()
        }
        
        const filteredData = PopularDestinationsData.filter(
            (item) => {
                return item.city.toLowerCase().includes(value.toLowerCase()) ||
                    item.airport.toLowerCase().includes(value.toLowerCase()) ||
                    item.code.toLowerCase() === (value.toLowerCase())
            }
        )


        if (filteredData.length) {
            // show suggestions with filtered data
            setListHeaderTitle('SUGGESTIONS')
            setListData(filteredData)
            
            setNoSuggestionsDisplay(false)
        } else {
            setListHeaderTitle('')
            setListData()

            setNoSuggestionsDisplay(true)
        }
    }

    const handleDestinationPressed = (item) => {
        if ((!isFromFocused && item.city === fromDest.city) ||
            (!isToFocused && item.city == toDest.city)) {
            alert('Both destinations cannot be same.')
            return
        }

        Keyboard.dismiss()
        
        navigation.navigate({
            name: 'Home',
            params: {data: item, focusedField: isFromFocused? 'from' : 'to'},
            merge: true
        })
    }

    const showRecentSearches = () => {
        setListHeaderTitle('RECENT SEARCHES')
        setListData(RecentDestinationsData)
        setNoSuggestionsDisplay(false)
    }

    return (
        <View style={{
            flex: 1,
            ...styles.container
        }}>
            <TouchableOpacity // from
                activeOpacity={1}
                onPress={() => {
                    if (!isFromFocused) {
                        showRecentSearches()

                        setIsFromFocused(true)
                        setIsToFocused(false)
                    }
                }}
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    ...styles.fromContainer
                }}
            >

                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <Ionicons name="arrow-back-outline" size={24} color='black' style={styles.iconStyle} />
                </TouchableOpacity>

                {isFromFocused ? <InputCommonFocused compName={'FROM'} onSearch={handleSearch} /> :
                    <InputCommon compName={'FROM'} title={fromDest.city} titleDesc={fromDest.code} subtitle={fromDest.airport} />
                }
            </TouchableOpacity>

            <TouchableOpacity // to
                activeOpacity={1}
                onPress={() => {
                    if (!isToFocused) {
                        showRecentSearches()

                        setIsFromFocused(false)
                        setIsToFocused(true)
                    }
                }}
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    ...styles.fromContainer
                }}
            >
                <MaterialIcons name="flight-land" size={24} color='gray' style={styles.iconStyle} />

                {isToFocused ? <InputCommonFocused compName={'TO'} onSearch={handleSearch} /> :
                    <InputCommon compName={'TO'} title={toDest.city} titleDesc={toDest.code} subtitle={toDest.airport} />
                }
            </TouchableOpacity>

            
            <LocationList header={listHeaderTitle} listData={listData} handleDestinationPressed={handleDestinationPressed} />

            { noSuggestionsDisplay &&
                <Text style={{alignSelf:'center'}}>No Suggestions Found</Text> }

            { listHeaderTitle === 'RECENT SEARCHES' &&
                <LocationList header={'POPULAR CITIES'} listData={PopularDestinationsData} handleDestinationPressed={handleDestinationPressed} /> }
        </View>
    )
}

export default SelectFlightRoute

const styles = StyleSheet.create({
    container: {
        paddingTop: 8,
        backgroundColor: 'white'
    },
    fromContainer: {
        backgroundColor: COLORS.lightestGray,
        marginHorizontal: 16,
        marginVertical: 6,
        padding: 8,
        borderRadius: 1,
        borderWidth: 0.8,
        borderColor: 'gray'
    },
    iconStyle: {
        marginRight: 8
    },
    
    
    // for InputCommon component {FROM and TO}
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
        marginLeft: 8,
        color: 'gray',
        fontWeight: 'regular',
        fontSize: 12.5,
    },

})