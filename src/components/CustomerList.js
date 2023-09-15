import { View, Text, FlatList, TouchableOpacity, styles, Image } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Orders from '../screens/Orders';

const CustomerList = ({ navigation }) => {

    const [customers, setCustomers] = React.useState(['customers']);

    const [orders, setOrders] = React.useState(['orders']);

    const [payments, setPayments] = React.useState(['payments']);

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

    const customerDebt = (id) =>{
        const customerDebt = []
        orders.filter(getOrder => getOrder.orderCustomerId == id).map(filteredOrder => {
            customerDebt.push(parseInt(filteredOrder.orderPrice)*parseInt(filteredOrder.orderQuantity))
        })

        const customerPayer = []
        payments.filter(getPayment => getPayment.paymentCustomerId == id).map(filteredPayer => {
            customerPayer.push(parseInt(filteredPayer.paymentPrice))
        })

        return <Text>{customerDebt.reduce((sum, current) => sum + current, 0) - customerPayer.reduce((sum, current) => sum + current, 0)}</Text>
    }


    const ListItem = ({ customer }) => {


        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('CustomerDetail',
                    {
                        customerId: customer.customerId
                    })
                }
                style={{
                    backgroundColor: '#E6ECF4',
                    width: '97%',
                    marginLeft: '1.5%',
                    marginTop: 10,
                    padding: 10,
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
                        >{customer.customerName}</Text>
                        <Text
                            style={{
                                fontSize: 13,
                                color: 'grey',
                            }}
                        >{customer.customerCompany}</Text>
                    </View>
                    <View>
                        <Text
                            style={{
                                fontSize: 13,
                                color: 'grey',
                            }}
                        >{customer?.date}</Text>
                        <Text
                            style={{
                                fontSize: 15,
                                color: '#111',
                                textAlign: 'right'
                            }}
                        >{customerDebt(customer.customerId)} ₺</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };



    return (
        <View
            style={{
                backgroundColor: 'orange',
                width: 100,
                height: 100
            }}
        >   
            
            <FlatList
                style={{
                    backgroundColor: 'red'
                }}
                showsVerticalScrollIndicator={false}
                data={customers}
                renderItem={({ item }) => <ListItem customer={item} />}
            />
        </View>
    )
}

export default CustomerList