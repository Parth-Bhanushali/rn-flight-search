import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native'
import React from 'react'

import Destination from './Destination';

const LocationList = ({header, listData, handleDestinationPressed}) => {
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