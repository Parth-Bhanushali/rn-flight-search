import {View, Text, Button, Modal, TouchableOpacity, StyleSheet} from 'react-native'
import Slider from '@react-native-community/slider'
import {MaterialIcons} from '@expo/vector-icons'; 
import React from 'react'

import {COLORS} from '../../../../constants'

const PriceFilterModal = ({ filterVisible, setFilterVisible, sliderRange, setSliderRange }) => {
    return (
        <Modal
            transparent={true}
            visible={filterVisible} >
            <View style={{ backgroundColor: '#000000aa', justifyContent: 'center', flex: 1 }}>
                <View style={{
                    backgroundColor: COLORS.lighterGray,
                    margin: 24,
                    paddingBottom: 16,
                    justifyContent: 'center',
                    borderRadius: 6,
                }}>

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: 8,
                        marginHorizontal: 16,
                    }}>
                        <Text style={{
                            fontSize: 20,
                            color: 'black', alignSelf: 'flex-start', paddingVertical: 4
                        }}>Filter options:</Text>

                        <TouchableOpacity>
                            <MaterialIcons name="close" size={22} style={{ padding: 4 }} color="black"
                                onPress={() => setFilterVisible(false)} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ backgroundColor: 'gray', marginTop: 8, width: '100%', height: 1 }} />

                    <View style={{ paddingHorizontal: 16 }}>

                        <Text style={{
                            fontSize: 16, marginTop: 16,
                            color: 'black', alignSelf: 'center'
                        }}>What is your budget?</Text>

                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'baseline', marginTop: 8 }}>
                            <Text style={{ fontSize: 25, alignSelf: 'baseline' }}>{sliderRange}</Text>
                            <Text style={{ fontSize: 16, alignSelf: 'baseline' }}> Rs.</Text>
                        </View>

                        <Slider
                            minimumTrackTintColor='red'
                            maximumTrackTintColor={COLORS.lightGray}
                            thumbTintColor='red'
                            minimumValue={1}
                            maximumValue={100}
                            onValueChange={(value) => setSliderRange(Math.floor(value) * 100)}
                            style={{ width: '100%', height: 16, alignSelf: 'center', marginTop: 12, marginBottom: 4 }} />

                        <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 16 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                                <Text style={{ color: COLORS.darkGray }}>1350</Text>
                                <Text style={{ color: COLORS.darkGray, fontSize: 11 }}> INR</Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                                <Text style={{ color: COLORS.darkGray }}>12000</Text>
                                <Text style={{ color: COLORS.darkGray, fontSize: 11 }}> INR</Text>
                            </View>
                        </View>
                        <Button
                            title='Apply Changes'
                            onPress={() => { setFilterVisible(false) }}
                            style={{ marginBottom: 16 }}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default PriceFilterModal

const styles = StyleSheet.create({})