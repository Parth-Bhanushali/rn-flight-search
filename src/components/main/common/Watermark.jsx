import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Watermark = () => {
    return (
        <Text style={{
            top:8,
            alignSelf: 'center', 
            // position: 'absolute',
            color: 'gray',
            opacity: 0.75
        }}>Assignment by Parth Bhanushali</Text>
    )
}

export default Watermark

const styles = StyleSheet.create({})