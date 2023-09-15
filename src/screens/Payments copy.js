import { View, Text } from 'react-native'
import React from 'react'
import hmacSHA512 from 'crypto-js/hmac-sha512';
import { HmacSHA256 } from 'crypto-js';
import Base64 from 'crypto-js/enc-base64';

const Payments = () => {

  //Global Modules
  


  //Installed Modules


  const burl = "https://api.binance.com";
  const endPoint = "/api/v3/account";
  const dataQueryString = "recvWindow=5000&timestamp=" + Date.now();

  const keys = {
    "akey": 'qwuv3GLZcLLkBCm8OwTeZGOz5IQMWlLPfcRzNpvc1tNbpYyF1BluLI9QTpSYkwEt',
    "skey": 'oLeszupLVuNzmqvntjSp6YahkqZdGX1yEntGSwqJMobKN8vRSQgvaqRzgzDhcMKs'
  }

  const signature = Base64.stringify(hmacSHA512(dataQueryString, keys['skey']));

  console.log(signature)

  const url = burl + endPoint + '?' + dataQueryString + '&signature=' + signature;

  const ourRequest = new XMLHttpRequest();


  ourRequest.open('POST', url, true);
  ourRequest.setRequestHeader('X-MBX-APIKEY', keys['akey']);

  ourRequest.onload = function () {
    console.log(ourRequest.responseText);
  }
  ourRequest.send();
  return (
    <View>
      <Text>Profile</Text>
    </View>
  )
}

export default Payments