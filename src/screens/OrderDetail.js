import { View, Text, TouchableOpacity, Button, Alert, Linking, TextInput, ScrollView, Image } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import Header from '../components/Header';

const OrderDetail = ({ route }) => {
  const { customerId } = route.params;
  const { date } = route.params;

  const [orders, setOrders] = React.useState(['orders']);

  const [customers, setCustomers] = React.useState(['customers']);

  const [products, setProducts] = React.useState(['products']);

  const [messagesD, setMessagesD] = React.useState('')

  React.useEffect(() => {
      getProductsFromUserDevice();
  }, []);

  const getProductsFromUserDevice = async () => {
      try {
          const products = await AsyncStorage.getItem('products');
          if (products != null) {
              setProducts(JSON.parse(products));
          }
      } catch (error) {
          console.log(error);
      }
  };

  React.useEffect(() => {
    getOrdersFromUserDevice();
  }, []);

  const getOrdersFromUserDevice = async () => {
    try {
      const orders = await AsyncStorage.getItem('orders');
      if (orders != null) {
        setOrders(JSON.parse(orders));
      }
    } catch (error) {
      console.log(error);
    }
  };


  React.useEffect(() => {
    getCustomersFromUserDevice();
  }, []);

  const getCustomersFromUserDevice = async () => {
      try {
          const customers = await AsyncStorage.getItem('customers');
          if (customers != null) {
              setCustomers(JSON.parse(customers));
          }
      } catch (error) {
          console.log(error);
      }
  };

  const getCustomerName = (id) => {

    const getCustomerName = customers.filter(getCustomer => getCustomer.customerId == id).map(filteredCustomer => filteredCustomer.customerName);
    return getCustomerName
  }

  const getCustomerCompany = (id) => {

    const getCustomerCompany = customers.filter(getCustomer => getCustomer.customerId == id).map(filteredCustomer => filteredCustomer.customerCompany);
    return getCustomerCompany
  }

  const getCustomerNumber = (id) => {

    const getCustomerNumber = customers.filter(getCustomer => getCustomer.customerId == id).map(filteredCustomer => filteredCustomer.customerNumber);
    return getCustomerNumber
  }

  const getProductName = (id) => {

    const getProductName = products.filter(getProduct => getProduct.productId == id).map(filteredProduct => filteredProduct.productName);
    return getProductName
  }


  const getOrdersId = () => {

    const getBigOrderId = orders.filter(getOrder => getOrder.orderCustomerId == customerId).map(getOrdersId => getOrdersId.orderId);
    const getList =  getBigOrderId.sort((a, b) => a-b).reverse();
    const newList = [...new Set(getList)]
    return newList
  }

  const getOrderList = (id) => {
    const orderForMessage = []
    orders.filter(getOrder => getOrder.orderId == id).map(filteredOrder => 
      orderForMessage.push('\n' + filteredOrder.orderQuantity + ' Adet ' + getProductName(filteredOrder.orderName) + ' ' + filteredOrder.orderPrice*filteredOrder.orderQuantity + '₺(' + filteredOrder.orderPrice + '₺)')
    )
    
    return orderForMessage.toString()
  }
 
  const getOrder = (id) => {
    const orderForMessage = []
    orders.filter(getOrder => getOrder.orderId == id).map(filteredOrder => 
      orderForMessage.push('\n' + filteredOrder.orderQuantity + ' Adet ' + getProductName(filteredOrder.orderName) + ' *' +filteredOrder.orderPrice*filteredOrder.orderQuantity + '₺*(' + filteredOrder.orderPrice + '₺)')
    )
    
    return orderForMessage.toString()
  }

  
  const sendWhatsapp = (phoneNumber, oI, totalPriceReduce) =>{
    const orderSummary = getOrder(oI)
    const customerName = getCustomerName(customerId)
    const customerCompany = getCustomerCompany(customerId)
    const totalPrice = totalPriceReduce

    const message = '*' +customerName + ' - ' + customerCompany + '*' + '\n' +
                    '*Sipariş No:* ' + oI + '\n' +
                    orderSummary + '\n\n' +
                    '*Toplam Tutar : ' + totalPrice + '*₺';
    const url = 'whatsapp://send?text=' + message + '&phone=+90' + phoneNumber;
    return(
      Linking.openURL(url)
    )
  }

  const getOrderAlert = (oI, totalPriceReduce) =>{
    const orderSummary = getOrderList(oI)
    const customerName = getCustomerName(customerId)
    const customerCompany = getCustomerCompany(customerId)
    const totalPrice = totalPriceReduce

    const message = orderSummary + '\n\n' + 'Toplam Tutar : ' + totalPrice + '₺';

    return(
      Alert.alert(
        customerName + ' - ' + customerCompany + '\n' + 'Sipariş No:' + oI,
        message
      )
    )
  }
  

  const getOrderId = getOrdersId()

  const GetOrderGroup = () => {
    const orderTotalPrice = []
    


    return (
      getOrderId.map(oI => {
        const totalPrice = []

      orders.filter(getOrder => getOrder.orderCustomerId == customerId && getOrder.orderId == oI).map(filteredItem => {
        {totalPrice.push(parseInt(filteredItem.orderPrice)*parseInt(filteredItem.orderQuantity))}
      })
        const totalPriceReduce = totalPrice.reduce((sum, current) => sum + current, 0)

      return (
        

      <TouchableOpacity
        onPress={() => getOrderAlert(oI, totalPriceReduce)}
        style={{
          backgroundColor: '#E6ECF4',
          width: '97%',
          marginLeft: '1.5%',
          marginTop: 5,
          padding: 10,
          borderRadius: 10
        }}
      >
        <View
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'baseline',
            justifyContent: 'space-between',
          }}
        >
          <View>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 18,
                color: '#111'
              }}
            >Sipariş No: {oI}</Text>
            <Text
              style={{
                fontSize: 15,
                color: '#111'
              }}
            >Adet: {totalPrice.length}</Text>
          </View>
          <View
            style={{
              display: 'flex',
              alignSelf: 'center'
            }}
          >
            <TouchableOpacity
              onPress={() => sendWhatsapp(getCustomerNumber(customerId), oI, totalPriceReduce)}
            >
              <Image
                    source={require('../../assets/image/whatsapp.png')}
                    style={{ width: 25, height: 25 }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              display: 'flex',
              alignSelf: 'center'
            }}
          >
            <Text
              style={{
                fontSize: 15,
                color: '#111'
              }}
            >{totalPriceReduce} ₺</Text>
          </View>
        </View>
      </TouchableOpacity>
      )

                }))

                

  };

  return (
    <View>
      <Header title={getCustomerName(customerId)}></Header>
      <TouchableOpacity
                onPress={() => {getCustomersFromUserDevice(); getOrdersFromUserDevice()}}
                style={{
                    marginTop: -45,
                    marginBottom: 20,
                    paddingRight: '3.7%',
                    width: 30,
                    marginRight: '2.5%',
                    alignSelf: 'flex-end'
                }}
            >
                <Image
                    source={require('../../assets/image/refresh.png')}
                    style={{ width: 25, height: 25 }}
                />
            </TouchableOpacity>
      <ScrollView>
        <GetOrderGroup></GetOrderGroup>
      </ScrollView>
    </View>
  )
}

export default OrderDetail