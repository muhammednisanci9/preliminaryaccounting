import { View, Text } from 'react-native'
import React from 'react'
import Binance from 'binance-api-node'

const Payments = () => {




  const getTime = Date.now()

  // Authenticated client, can make signed calls
  const client = Binance({
    apiKey: 'qwuv3GLZcLLkBCm8OwTeZGOz5IQMWlLPfcRzNpvc1tNbpYyF1BluLI9QTpSYkwEt',
    apiSecret: 'oLeszupLVuNzmqvntjSp6YahkqZdGX1yEntGSwqJMobKN8vRSQgvaqRzgzDhcMKs',
    getTime: getTime,
  })


  console.log(
    client.allOrders({
      symbol: 'CLVUSDT',
    }),
  )


  return (
    <View>
      <Text>Payments</Text>
    </View>
  )
}

export default Payments