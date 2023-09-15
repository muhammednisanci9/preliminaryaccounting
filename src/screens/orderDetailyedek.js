import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

const OrderDetail = ({ route }) => {
  const { customerId } = route.params;
  const { date } = route.params;

  const [orders, setOrders] = React.useState(['orders']);

  const [products, setProducts] = React.useState(['products']);


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


  const getProductName = (id) => {

    const getProductName = products.filter(getProduct => getProduct.productId == id).map(filteredProduct => filteredProduct.productName);
    return getProductName
  }

  const getNewOrderId = () => {

    const getBigOrderId = orders.filter(getOrder => getOrder.orderCustomerId == customerId).map(getOrdersId => getOrdersId.orderId);
    let getList =  getBigOrderId.sort((a, b) => a-b).reverse();
    let newList = [...new Set(getList)]
    return newList+","
  }

  const dene = [5,4,3,2,1]

  const GetOrderGroup = () => {
    const orderTotalPrice = []
    
    return (
      dene.map((degis) => (
        orders.filter(getOrder => getOrder.orderCustomerId == customerId && getOrder.orderId == degis).map(filteredItem => (
          <TouchableOpacity
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
                >{getProductName(filteredItem.orderName)}</Text>
                <Text
                  style={{
                    fontSize: 15,
                    color: '#111'
                  }}
                >{filteredItem.orderQuantity}</Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 15,
                    color: '#111'
                  }}
                ></Text>
                <Text
                  style={{
                    fontSize: 15,
                    color: '#111'
                  }}
                >{filteredItem.orderPrice} TL {filteredItem.orderId}</Text>
              </View>
            </View>
          </TouchableOpacity>
      )))))



  };

  return (
    <View>
      <Text>OrderDetail {customerId + "  -  " + date}</Text>
      <Text>{getNewOrderId()}</Text>
      <GetOrderGroup></GetOrderGroup>
    </View>
  )
}

export default OrderDetail