import React from 'react'
import {View, Text, Image} from 'react-native'

import {Watermark} from '../../components'
import {assets} from '../../../constants'

const Account = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={assets.account_placeholder} style={{width: 100, height: 100}} />
            <Text style={{marginTop: 16}}>Account specific info. will be shown here</Text>
        
            <Watermark />
        </View>
    )
}

export default Account