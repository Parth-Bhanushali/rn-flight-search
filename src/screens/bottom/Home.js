import React from 'react'
import {View, Text} from 'react-native'

const Home = ({ navigation }) => {
    const navigateToDetails = () => {
        navigation.navigate('Flight Results')
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Home</Text>

            <Text onPress={navigateToDetails} style={{
                fontStyle: 'italic',
                fontWeight: 'bold'
            }}>Click here to go to Details</Text>
        </View>


    )
}

export default Home