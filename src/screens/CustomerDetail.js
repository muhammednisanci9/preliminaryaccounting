import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Animated, View, TouchableOpacity, StyleSheet, Text, ScrollView } from 'react-native';
import Header from '../components/Header';




const CustomerDetail = ({ route }) => {
  const { customerId } = route.params;

  const [activePayment, setActivePayment] = React.useState(false)
  const [activeProduct, setActiveProduct] = React.useState(true)
  const [activeSummary, setActiveSummary] = React.useState(false)
  

  const [payments, setPayments] = React.useState(['payments']);

  const [customers, setCustomers] = React.useState(['customers']);


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

  const getOrdersId = () => {

    const getBigOrderId = orders.filter(getOrder => getOrder.orderCustomerId == customerId).map(getOrdersId => getOrdersId.orderId);
    const getList =  getBigOrderId.sort((a, b) => a-b).reverse();
    const newList = [...new Set(getList)]
    return newList
  }

  const getOrderList = (id) => {

    const getOrder = orders.filter(getOrder => getOrder.orderId == id).map(filteredOrder => 
      
      <View>
        <Text>{getProductName(filteredOrder.orderName)}</Text>
        <Text>{filteredOrder.orderPrice}</Text>
      </View>
      );
    return getOrder
  }


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


  React.useEffect(() => {
    getPaymentsFromUserDevice();
  }, []);

  const getPaymentsFromUserDevice = async () => {
    try {
      const payments = await AsyncStorage.getItem('payments');
      if (payments != null) {
        setPayments(JSON.parse(payments));
      }
    } catch (error) {
      console.log(error);
    }
  };



  const getCustomerName = (id) => {

    const getCustomerName = customers.filter(getCustomer => getCustomer.customerId == id).map(filteredCustomer => filteredCustomer.customerName);
    return (
      <Text>{getCustomerName}</Text>
    )
  }


  const GetPayment = () => {
    return (
      payments.filter(getPayment => getPayment.paymentCustomerId == customerId).map(filteredPayment => (
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
                  fontSize: 17,
                  color: '#111'
                }}
              >{filteredPayment.date}</Text>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 15,
                  color: '#111',
                  textAlign: 'right'
                }}
              >{filteredPayment.paymentPrice} ₺</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))
    )
  }

  const GetProduct = () => {
    return (
      products.map(
        product => {
          const totalPrice = []
          const totalQuantity = []
          orders.filter(getOrders => getOrders.orderCustomerId == customerId && getOrders.orderName == product.productId).map(filteredOrders => (
            totalPrice.push(parseInt(filteredOrders.orderPrice) * parseInt(filteredOrders.orderQuantity)),
            totalQuantity.push(parseInt(filteredOrders.orderQuantity))
          ))
          return (
              <View
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
                                >{getProductName(product.productId)}</Text>
                                <Text
                                    style={{
                                        fontSize: 15,
                                        color: '#111'
                                    }}
                                >{totalQuantity.reduce((sum, current) => sum + current, 0)} <Text style={{ fontSize: 13 }}>Adet</Text></Text>
                            </View>
                            <View
                            >
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
                                >{totalPrice.reduce((sum, current) => sum + current, 0)} ₺</Text>
                            </View>
                        </View>
                    </View>
          )
      })
      
    )
  }
  
  return (
    <View>
      <Header title={getCustomerName(customerId)}></Header>
      <View style={styles.titleContainer}>
        <TouchableOpacity
          onPress={() => {setActiveProduct(true); setActivePayment(false); setActiveSummary(false)}}
          style={{
            display: 'flex',
            flexGrow: 1,
          }}
        >
          <Text style={[activeProduct ? styles.categoryBarActive : styles.categoryBar]}>Ürünler</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {setActivePayment(true); setActiveSummary(false); setActiveProduct(false)}}
          style={{
            display: 'flex',
            flexGrow: 1,

          }}
        >
          <Text style={[activePayment ? styles.categoryBarActive : styles.categoryBar]}>Ödemeler</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => {setActiveSummary(true); setActivePayment(false); setActiveProduct(false)}}
        >
          <Text>Özet</Text>
        </TouchableOpacity> */}
      </View>
      <ScrollView>
        {
          activeProduct == true ? <GetProduct></GetProduct> : false ||
          activePayment == true ? <GetPayment></GetPayment> : false ||
          activeSummary == true ? <GetPayment></GetPayment> : false
        }
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  activeItem: {
    backgroundColor: 'green',
    padding: 10,
    width: '97%',
    borderRadius: 10
  },
  normallyItem: {
    backgroundColor: 'grey',
    padding: 10,
    width: '97%',
    borderRadius: 10
  },
  titleContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  categoryBarActive: {
    textAlign: 'center',
    paddingBottom: 10,
    paddingTop: 10,
    borderBottomWidth: 2,
    fontWeight: 'bold'
  },
  categoryBar: {
    textAlign: 'center',
    paddingBottom: 10,
    paddingTop: 10,
    fontWeight: 'bold'
  }
});



export default CustomerDetail

