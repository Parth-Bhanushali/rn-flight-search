import React from 'react'
import {View, Text, Image, TouchableOpacity, FlatList, StyleSheet} from 'react-native'
import {Ionicons, MaterialIcons, Octicons, MaterialCommunityIcons, Fontisto} from '@expo/vector-icons'; 

import {COLORS, SHADOWS, assets} from '../../../constants';

var navigator = null

const handleBack = () => {
    navigator.goBack()
}

const handleEdit = () => {
    alert('Edit clicked:\nThis action is currently not provided with implementation.')
}

const SearchHeader = () => {
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
                <Text style={styles.searchHeaderTitle}>New Delhi to Mumbai</Text>
                <Text style={styles.searchHeaderSubtitle}>13 Oct | 1 Adult | Economy</Text>
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

const MainHeader = () => {
    return (
        <View style={styles.mainHeaderContainer}>
            <SearchHeader />

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View>
                    <Text style={{ alignSelf: 'flex-start', ...styles.mainHeaderTitle }}>Flight Results</Text>
                    <Text style={{ alignSelf: 'flex-start', ...styles.mainHeaderSubtitle }}>12 Flights found</Text>
                </View>

                <View style={{ marginRight: 20, alignItems: 'center', flexDirection: 'row' }}>
                    <Text style={styles.cityCodeText}>DEL</Text>
                    <ArrowBetweenCodes roundtrip={false} />
                    <Text style={styles.cityCodeText}>BOM</Text>
                </View>
            </View>
        </View>
    )
}

const ListItem = ({item}) => {
    return (
        <View style={styles.listItemBackground}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                    <Image source={assets.indigoLogo} style={styles.listItemCompanyLogo} />
                    <Text style={styles.listItemCompanyName}>IndiGo</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                    <MaterialCommunityIcons name="clock-fast" size={18} color="gray" />
                    <Text style={styles.listItemOnTime}>100% on time</Text>
                </View>
            </View>


            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 16}}>
                <View>
                    <Text style={styles.listItemTimeAndPrice}>10:00</Text>
                    <Text style={styles.listItemSubLocation}>New Delhi</Text>
                </View>

                <View style={{alignItems: 'center'}}>
                    <Text style={{fontWeight: '400', fontSize: 11, paddingBottom: 4}}>2h 15m</Text>
                    <Image source={assets.line} style={{width: 60, height:2.5, tintColor: 'green'}} />
                    <Text style={{fontWeight: '400', fontSize: 11, paddingTop: 3, color: 'gray'}}>Non stop</Text>
                </View>

                <View style={{alignItems: 'center'}}>
                    <Text style={styles.listItemTimeAndPrice}>12:15</Text>
                    <Text style={styles.listItemSubLocation}>Mumbai</Text>
                </View>

                <View style={{alignItems: 'flex-end'}}>
                    <Text style={styles.listItemTimeAndPrice}>₹ 5,357</Text>
                    <Text style={{...styles.listItemSubLocation, color: 'gray'}}>per adult</Text>
                </View>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 16}}>
                <Octicons name="dot-fill" size={14} color="orange" />
                <Text style={styles.listItemPromotionalLabel}>Use HDFCEMI to get FLAT 1000 OFF* on HDFC cards EMI; Get Rs. 200 off using  BMFBONUS*</Text>
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

const FlightResults = ({ navigation }) => {
    navigator = navigation
    return (
        <View style={{flex: 1}}>        
            <MainHeader />
        
            <FlatList 
                data={['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']}
                renderItem={({ item }) => <ListItem item={item} />}
                keyExtractor={item => item}
                overScrollMode='never'
                style={{backgroundColor: COLORS.lighterGray}}
                contentContainerStyle={{rowGap: 10, paddingTop: 12, paddingBottom: 16}}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={() => <PromoListHeader />}
            />
        </View>
    )
}

export default FlightResults

const styles = StyleSheet.create({
    mainHeaderContainer: {
        backgroundColor: 'white',
        ...SHADOWS.dark, 
        borderRadius: 1, 
        borderWidth: 1, 
        borderColor: COLORS.lightGray,
    },
    mainHeaderTitle: {
        marginLeft: 18, marginTop: 8, marginBottom: 2, fontSize: 20, fontWeight: '300' 
    },
    mainHeaderSubtitle: {
        marginLeft: 18, marginBottom: 8, fontSize: 13, fontWeight: '400', color: 'gray'
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
        marginLeft: 4, marginBottom:2, fontWeight: 'regular', fontSize: 12, color: 'gray'
    },
    listItemTimeAndPrice: {
        fontWeight: 'bold', 
        fontSize: 16
    },
    listItemSubLocation: {
        fontSize: 10, 
        paddingLeft:2
    },
    listItemPromotionalLabel: {
        color:COLORS.gray, fontSize: 10, paddingLeft: 8, fontWeight: '400'
    }
})