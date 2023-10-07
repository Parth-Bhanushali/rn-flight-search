import {StyleSheet, Text, View} from 'react-native'
import React from 'react'

const title = 'FREE Full Refund* due to Medical Reasons'
const description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla praesentium error iste est pariatur magni et, perspiciatis similique ullam distinctio odit accusamus. Ab pariatur dolorem quo deleniti unde? Voluptatibus, debitis?'

const DisplayRefundDescription = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
        </View>
    )
}

export default DisplayRefundDescription

const styles = StyleSheet.create({
    container: {
        margin: 18,
        padding: 8,
        backgroundColor: '#D4EDDA',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#C6E8CE',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 13,
        color: '#155724'
    },
    description: {
        fontSize: 11,
        color: '#155724'
    }
})