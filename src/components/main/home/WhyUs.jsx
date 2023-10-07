import {StyleSheet, Text, View, Image} from 'react-native'
import React from 'react'

import {COLORS, assets} from '../../../../constants'

const titles = [
    '24/7 Customer Support',
    'Secure Booking Process',
    'Trusted by Members',
    '20 Million Happy Members']

const descriptions = [
    'We are here to help whenever you need us',
    'Your personal information is secured using the latest industry standards encryption',
    'We have earned 4.7/5 stars on playstore',
    'Millions of members currently rely on BookMyFlight for their travel needs',
    'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis, explicabo?'
]

const Reason = ({ icon, title, description }) => {
    return (
        <View style={styles.reasonContainer}>
            <Image style={{ width: 30, height: 30, resizeMode: 'contain', marginLeft: 8, marginRight: 16 }} source={icon} />

            <View style={styles.reasonTextsContainer}>
                <Text style={styles.reasonTitleText}>{title}</Text>
                <Text style={styles.reasonDescriptionText}>{description}</Text>
            </View>
        </View>
    )
}

const Divider = () => {
    return <View style={styles.divider} />
}

const WhyUs = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Why book with BookMyFlight?</Text>

            <Reason icon={assets.customer_support} title={titles[0]} description={descriptions[0]} />
                <Divider />
            <Reason icon={assets.secure_data} title={titles[1]} description={descriptions[1]} />
                <Divider />
            <Reason icon={assets.thumb_trust} title={titles[2]} description={descriptions[2]} />
            <   Divider />
            <Reason icon={assets.happy_members} title={titles[3]} description={descriptions[3]} />
        </View>
    )
}

export default WhyUs

const styles = StyleSheet.create({
    container: {
        marginLeft: 18,
        marginRight: 16,
        marginBottom: 8
    },
    title: {
        fontWeight: '500',
        fontSize: 16,
        marginBottom: 8
    },
    reasonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
    reasonTextsContainer: {
        flex: 1,
        paddingVertical: 4
    },
    reasonTitleText: {
        fontWeight: 'bold',
        fontSize: 13.5,
        color: COLORS.darkGray
    },
    reasonDescriptionText: {
        fontSize: 12.5,
        color: 'gray'
    },
    divider: {
        height: 1,
        width: '100%',
        backgroundColor: '#DDDDDD'
    }
})