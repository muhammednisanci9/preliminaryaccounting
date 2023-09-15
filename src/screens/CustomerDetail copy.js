import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomerDetailCopy = ({ route }) => {
    const { customerId } = route.params;


    const [orders, setOrders] = React.useState(['orders']);



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


    const GetOrderGroup = () => {
        const orderTotalPrice = []

        orders.filter(getOrder => getOrder.orderCustomerId == customerId).map(filteredItem => {
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
                        >sa</Text>
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
                        >{filteredItem.orderPrice}</Text>
                    </View>
                </View>
            </TouchableOpacity>

            return (
                <Text>{orderTotalPrice.push(parseInt(filteredItem.orderPrice) * parseInt(filteredItem.orderQuantity))}</Text>
            )

        })

        return <Text>{orderTotalPrice.reduce((sum, current) => sum + current, 0)} + {orderTotalPrice.length}</Text>

    };


    

    return (
        <View>
            <Text>CustomerDetail {customerId}</Text>
            <GetOrderGroup></GetOrderGroup>
        </View>
    )
}

export default CustomerDetailCopy