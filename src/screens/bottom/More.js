import React from 'react'
import {View, Text, Image} from 'react-native'

import {assets} from '../../../constants'

const More = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={assets.more_placeholder} style={{width: 100, height: 100}} />
            <Text style={{marginTop: 16}}>FAQs & Support to be given here</Text>
        </View>
    )
}

export default More