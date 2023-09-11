import React from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
 import { RoundedProducsList } from '../components/RoundedProducsList'
import { productsData } from '../data/products'
 
const TestScreen = () => {
    return (
        <SafeAreaView style={{flex:1, margin:0, backgroundColor:'rgba(135, 137, 132, 0.16)'}}>
            <Text style={{color:"red"}}>dd</Text>
            
            <RoundedProducsList data={productsData} />
        </SafeAreaView>
    )
}

export default TestScreen

const styles = StyleSheet.create({})
