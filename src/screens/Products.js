import { View, Text } from 'react-native'
import React from 'react'
import ProductList from '../components/ProductList'
import ProductAdd from '../components/ProductAdd'
import Header from '../components/Header'

const Products = () => {
  return (
    <View
      style={{
        flex: 1
      }}
    >
      <Header title="Ürünler"></Header>
      <ProductList></ProductList>
      <ProductAdd></ProductAdd>
    </View>
  )
}

export default Products