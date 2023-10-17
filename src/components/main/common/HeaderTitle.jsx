import {StyleSheet, Image} from 'react-native'
import React from 'react'

import {assets} from '../../../../constants'

const HeaderTitle = () => {
    return <Image source={assets.app_main_header} style={styles.headerTitleLogo}/>
}

export default HeaderTitle

const styles = StyleSheet.create({
    headerTitleLogo: {
        // backgroundColor: 'pink', 
        marginRight: 48, 
        width: 240, 
        height: '100%',  
        flex:1
    }
})