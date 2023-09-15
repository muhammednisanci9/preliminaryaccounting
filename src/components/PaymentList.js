import { View, Text, FlatList, TouchableOpacity, styles, Image } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const PaymentList = () => {

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


    const ListItem = ({ payment }) => {


        return (
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
                        >{getCustomerName(payment.paymentCustomerId)}</Text>
                    </View>
                    <View>
                        <Text
                            style={{
                                fontSize: 13,
                                color: 'grey'
                            }}
                        >{payment.date}</Text>
                        <Text
                            style={{
                                fontSize: 15,
                                color: '#111',
                                textAlign: 'right'
                            }}
                        >{payment.paymentPrice} ₺</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };



    return (
        <View
            style={{
                flex: 1
            }}
        >
            <TouchableOpacity
                onPress={() => getPaymentsFromUserDevice()}
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
            <FlatList

                showsVerticalScrollIndicator={false}
                data={payments}
                renderItem={({ item }) => <ListItem payment={item} />}
            />
        </View>
    )
}

export default PaymentList