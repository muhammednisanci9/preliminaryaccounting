import { View, Text } from 'react-native'
import React from 'react'
import OrderList from '../components/OrderList'
import OrderAdd from '../components/OrderAdd'
import Header from '../components/Header'

const Orders = ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1
      }}
    >
      <Header title="Siparişler"></Header>
      <OrderList navigation={navigation}></OrderList>
      <OrderAdd></OrderAdd>
    </View>
  )
}

export default Orders