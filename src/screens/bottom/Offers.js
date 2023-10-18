import React from 'react'
import { View, Text, Image } from 'react-native'

import {assets} from '../../../constants'

const Offers = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={assets.offers_placeholder} style={{width: 100, height: 100}} />
            <Text style={{marginTop: 16}}>Offers will be shown here</Text>
        </View>
    )
}

export default Offers