import React from 'react'
import {View, Text, Image} from 'react-native'

import {Watermark} from '../../components'
import {assets} from '../../../constants'

const Bookings = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={assets.bookings_placeholder} style={{width: 100, height: 100}} />
            <Text style={{marginTop: 16}}>Bookings data will be shown here</Text>

            <Watermark />
        </View>
    )
}

export default Bookings