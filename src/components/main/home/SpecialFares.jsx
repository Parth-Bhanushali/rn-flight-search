import {useState} from 'react'
import {View, Text, FlatList, TouchableOpacity} from 'react-native'
import React from 'react'
import {StyleSheet} from 'react-native'

import {COLORS} from '../../../../constants'

const specialCategories = ['Student', 'Armed Forces', 'Senior Citizen', 'Double Seat']

const SpecialFares = () => {
    const [selectedSpecialCategory, setSelectedSpecialCategory] = useState()

    const handleFareItemPress = (index, alreadySelected) => {
        if (specialCategories[index] === alreadySelected) {
            // deselect
            setSelectedSpecialCategory()
        } else {
            // select at index
            setSelectedSpecialCategory(specialCategories[index])
        }
    }

    const FareType = ({ index, alreadySelected }) => {
        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => handleFareItemPress(index, alreadySelected)}
                style={styles.fareTypeItem(index, alreadySelected)}
            >
                <Text style={styles.fareTypeText(index, alreadySelected)}>{specialCategories[index]}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={{ marginVertical: 16 }}>
            <Text style={styles.mainLabel}>SPECIAL FARES (Optional)</Text>

            <FlatList
                data={specialCategories}
                renderItem={({ index }) => <FareType index={index} alreadySelected={selectedSpecialCategory} />}
                keyExtractor={item => item}
                contentContainerStyle={{ columnGap: 10 }}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

export default SpecialFares

const styles = StyleSheet.create({
    mainLabel: {
        marginLeft: 18, 
        fontWeight: '500',
        fontSize: 12
    },
    fareTypeItem: (index, selectedSpecialCategory) => ({
        marginLeft: index === 0 ? 17 : 0,
        marginRight: index === specialCategories.length - 1 ? 16 : 0,
        paddingHorizontal: 8,
        marginVertical: 8,
        backgroundColor: 'transparent',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: specialCategories[index] === selectedSpecialCategory ? COLORS.primary : COLORS.lightGray,
    }),
    fareTypeText: (index, selectedSpecialCategory) => ({
        padding: 8,
        fontWeight: '500',
        color: specialCategories[index] == selectedSpecialCategory ? COLORS.primary : 'gray'
    })
})