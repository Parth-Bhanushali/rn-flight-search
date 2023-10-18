import {View, Text} from 'react-native'
import React from 'react'

import {Watermark} from '../'

const MainDrawer = (props) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Content for MainDrawer</Text>

            <Watermark />
        </View>
    )
}

export default MainDrawer