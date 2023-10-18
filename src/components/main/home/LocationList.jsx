import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native'
import React from 'react'

import Destination from './Destination';

const FooterSpace = ({show}) => {
    return (
        show && <View style={{marginBottom: 16}} />
    )
}

const LocationList = ({header, listData, handleDestinationPressed, showFooterSpace}) => {
    return (
        <View>
            <Text style={styles.header}>{header}</Text>

            <FlatList
                keyboardShouldPersistTaps={'handled'}
                style={styles.listStyle}
                data={listData}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => handleDestinationPressed(item)}
                            activeOpacity={0.6}
                        >
                            <Destination item={item} />
                        </TouchableOpacity>
                    )
                }}
                keyExtractor={(item) => {
                    return (item.city.replace(/ /g, '') + item.city.length)
                }}
                ListFooterComponent={() => <FooterSpace show={showFooterSpace} />}
            />
        </View>
    )
}

export default LocationList

const styles = StyleSheet.create({
    header: {
        color: 'gray',
        fontWeight: '500',
        fontSize: 12,
        marginVertical: 16,
        marginLeft: 18
    },
    listStyle: {
        marginTop: -10
    }
})