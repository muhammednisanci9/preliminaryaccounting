import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import CustomerList from '../components/CustomerList'
import CustomerAdd from '../components/CustomerAdd'
import Header from '../components/Header'


const Customers = ({ navigation }) => {







  return (
    <View
      style={{
        flex: 1
      }}
    >
      <Header title="Müşteriler"></Header>
      <CustomerList navigation={navigation}/>
      <CustomerAdd></CustomerAdd>
    </View>
  )
}

export default Customers