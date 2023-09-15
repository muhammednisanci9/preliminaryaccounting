import { View, Text, FlatList, TouchableOpacity, styles, ScrollView, Image } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const OrderList = ({ navigation }) => {

    const [orders, setOrders] = React.useState(['orders']);

    const date = new Date().getDate(); //Current Date
    const month = new Date().getMonth() + 1; //Current Month
    const year = new Date().getFullYear(); //Current Year
    const addToTime = date + '/' + month + '/' + year;

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


    const ListItem = ({ order }) => {
        return (
            <TouchableOpacity
                style={{
                    backgroundColor: '#fefeef',
                    marginTop: 5,
                    width: '97%',
                    marginLeft: '1.5%',
                    padding: 5
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
                        >{order?.orderName}</Text>
                        <Text
                            style={{
                                fontSize: 15,
                                color: '#111'
                            }}
                        >{order?.orderPrice}</Text>
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
                        >{order?.orderId}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    const getOrderLength = (customerId) => {

        const getBigOrderId = orders.filter(getOrder => getOrder.orderCustomerId == customerId).map(getOrdersId => getOrdersId.orderId);
        const getList = getBigOrderId.sort((a, b) => a - b).reverse();
        const newList = [...new Set(getList)]
        return newList.length
    }


    const GetOrderGroup = ({ date, customerId }) => {
        const orderTotalPrice = []

        orders.filter(getOrder => getOrder.date == date && getOrder.orderCustomerId == customerId).map(filteredItem => {
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


    const GetOrderGroups = ({ date }) => {
        return (
            customers.map(filteredCustomer => {
                const orderTotalPrice = []
                orders.filter(getOrder => getOrder.orderCustomerId == filteredCustomer.customerId).map(filteredItem => {


                    return (
                        orderTotalPrice.push(parseInt(filteredItem.orderPrice) * parseInt(filteredItem.orderQuantity))
                    )

                })
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
                        onPress={() =>
                            navigation.navigate('OrderDetail',
                                {
                                    customerId: filteredCustomer.customerId,
                                    date: date
                                })
                        }
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
                                >{filteredCustomer.customerName}</Text>
                                <Text
                                    style={{
                                        fontSize: 15,
                                        color: 'grey',
                                    }}
                                >{getOrderLength(filteredCustomer.customerId)} <Text style={{ fontSize: 13 }}>Sipariş</Text></Text>
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
                                >{orderTotalPrice.reduce((sum, current) => sum + current, 0)} ₺</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )
            })
        )


        // return <Text>{orderTotalPrice.reduce((sum, current) => sum + current, 0)} + {orderTotalPrice.length}</Text>

    };



    return (
        <View
            style={{
                flex: 1
            }}
        >
            {/* <FlatList
                showsVerticalScrollIndicator={false}
                data={orders}
                renderItem={({ item }) => <ListItem order={item} />}
            /> */}
            <TouchableOpacity
                onPress={() => { getCustomersFromUserDevice(); getOrdersFromUserDevice() }}
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
                <GetOrderGroups date={addToTime} ></GetOrderGroups>
            </ScrollView>
        </View>
    )
}

export default OrderList