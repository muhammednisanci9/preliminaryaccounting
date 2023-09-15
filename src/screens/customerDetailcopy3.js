import React from 'react';
import { Animated, View, TouchableOpacity, StyleSheet, Text } from 'react-native';




const CustomerDetail = ({ route }) => {
  const { customerId } = route.params;

  

  const [payments, setPayments] = React.useState(['payments']);

  const [customers, setCustomers] = React.useState(['customers']);

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
    return getCustomerName
  }


  const GetPayment = () => {
    return (
      payments.filter(getPayment => getPayment.paymentCustomerId == 6).map(filteredPayment => (
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
              >{getCustomerName(filteredPayment.paymentCustomerId)}</Text>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 15,
                  color: '#111'
                }}
              >{filteredPayment.date}</Text>
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

  
  return (
    <View>
      <Text>sa {customerId}</Text>
      <View style={styles.titleContainer}>
        <TouchableOpacity>
          <Text>Ürünler</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => getCustomerName(6)}
        >
          <Text>Ödemeler</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Özet</Text>
        </TouchableOpacity>
      </View>
      <View>
        <GetPayment></GetPayment>
      </View>
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
  }
});



export default CustomerDetail

