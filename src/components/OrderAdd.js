import { View, TextInput, Button, Text, Alert, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import SelectDropdown from 'react-native-select-dropdown';
import { Picker } from '@react-native-picker/picker';
import BottomSheet from "react-native-gesture-bottom-sheet";

const OrderAdd = () => {


    const [products, setProducts] = React.useState(['products']);

    const [customers, setCustomers] = React.useState(['customers']);

    const [orderId, setOrderId] = React.useState('');

    const [orders, setOrders] = React.useState([]);

    const bottomSheet = React.useRef();

    const [orderCustomerId, setOrderCustomerId] = React.useState('');
    const [orderName, setOrderName] = React.useState('');
    const [orderPrice, setOrderPrice] = React.useState('');
    const [orderQuantity, setOrderQuantity] = React.useState('');



    const date = new Date().getDate(); //Current Date
    const month = new Date().getMonth() + 1; //Current Month
    const year = new Date().getFullYear(); //Current Year
    const addToTime = date + '/' + month + '/' + year;


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

    React.useEffect(() => {
        saveOrderToUserDevice(orders);
    }, [orders]);

    const addOrder = () => {
        if (orderName == '') {
            Alert.alert('HATA', 'Lütfen gerekli alanları doldurun!');
        } else {
            const newOrder = {
                orderId: orderId,
                orderCustomerId: orderCustomerId,
                orderName: orderName,
                orderPrice: orderPrice,
                orderQuantity: orderQuantity,
                date: addToTime,
            };
            setOrders([...orders, newOrder]);
            setOrderPrice('');
            setOrderQuantity('')
        }
    };

    const saveOrderToUserDevice = async orders => {
        try {
            const stringifyOrders = JSON.stringify(orders);
            await AsyncStorage.setItem('orders', stringifyOrders);
        } catch (error) {
            console.log(error);
        }
    };

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


    const SmallAdd = () => {
        return (
            <TouchableOpacity
                onPress={() => bottomSheet.current.show()}
                style={{
                    position: 'absolute',
                    bottom: 5,
                    right: 5,
                    backgroundColor: '#49B0AA',
                    borderRadius: 50,
                    padding: 15
                }}
            >
                <Image
                    style={{
                        width: 24,
                        height: 24
                    }}
                    source={require('../../assets/image/add.png')}
                />
            </TouchableOpacity>
        )
    }


    const getProductId = (id) => {

        const getProductPrice = products.filter(getProduct => getProduct.productId == id).map(filteredProduct => filteredProduct.productPrice);
        return getProductPrice.toString()
    }

    const getProductName = (id) => {

        const getProductName = products.filter(getProduct => getProduct.productId == id).map(filteredProduct => filteredProduct.productName);
        return getProductName
    }

    const getBigOrderId = () => {

        const getBigOrderId = orders.map(getOrdersId => getOrdersId.orderId);
        let getList =  getBigOrderId.sort((a, b) => a-b).reverse();
        return getList+","+" -> "+getList[0]
    }

    const getNewOrderId = () => {

        const getBigOrderId = orders.map(getOrdersId => getOrdersId.orderId);
        let getList =  getBigOrderId.sort((a, b) => a-b).reverse();
        let newOrderId = parseInt(getList[0]) + 1;
        return newOrderId.toString()
    }

    const createNewOrderId = () => {

        const getBigOrderId = orders.map(getOrdersId => getOrdersId.orderId);
        let getList =  getBigOrderId.sort((a, b) => a-b).reverse();
        let newOrderId = parseInt(getList[0]) + 1;
        if(isNaN(newOrderId.toString())){
            setOrderId('1');
        }else{
            setOrderId(newOrderId.toString());
        }
        
    }

    const useProductPrice = (id) => {

        const getProductPrice = products.filter(getProduct => getProduct.productId == id).map(filteredProduct => filteredProduct.productPrice);
        setOrderPrice(getProductPrice.toString())
        
    }

    // const GetOrderGroup = ({ date, customerId }) => {
    //     return (
    //         orders.filter(getOrder => getOrder.date == date && getOrder.orderCustomerId == customerId).map(filteredItem => (

    //             <TouchableOpacity
    //                 style={{
    //                     backgroundColor: '#E6ECF4',
    //                     width: '97%',
    //                     marginLeft: '1.5%',
    //                     marginTop: 5,
    //                     padding: 10,
    //                     borderRadius: 10
    //                 }}
    //             >
    //                 <View
    //                     style={{
    //                         width: '100%',
    //                         display: 'flex',
    //                         flexDirection: 'row',
    //                         alignItems: 'baseline',
    //                         justifyContent: 'space-between',
    //                     }}
    //                 >
    //                     <View>
    //                         <Text
    //                             style={{
    //                                 fontWeight: 'bold',
    //                                 fontSize: 18,
    //                                 color: '#111'
    //                             }}
    //                         >{getProductName(filteredItem.orderName)}</Text>
    //                         <Text
    //                             style={{
    //                                 fontSize: 15,
    //                                 color: '#111'
    //                             }}
    //                         ></Text>
    //                     </View>
    //                     <View>
    //                         <Text
    //                             style={{
    //                                 fontSize: 15,
    //                                 color: '#111'
    //                             }}
    //                         ></Text>
    //                         <Text
    //                             style={{
    //                                 fontSize: 15,
    //                                 color: '#111'
    //                             }}
    //                         >{filteredItem.orderQuantity}Ad. * {filteredItem.orderPrice}₺ {filteredItem.orderCustomerId} = {filteredItem.orderQuantity * filteredItem.orderPrice}₺</Text>
    //                     </View>
    //                 </View>
    //             </TouchableOpacity>

    //         )))

    // };

    const GetOrderGroup = ({ orderId, customerId }) => {
        return (
            
            orders.filter(getOrder => getOrder.orderId == orderId && getOrder.orderCustomerId == customerId).map(filteredItem => (

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
                        </View>
                        <View>
                            <Text
                                style={{
                                    fontSize: 15,
                                    color: '#111'
                                }}
                            >{filteredItem.orderQuantity}Ad. * {filteredItem.orderPrice}₺  = {filteredItem.orderQuantity * filteredItem.orderPrice}₺</Text>
                        </View>
                    </View>
                    
                </TouchableOpacity>

            )))

    };

    

    return (
        <View>

            <BottomSheet hasDraggableIcon ref={bottomSheet} height={600}
                style={{
                    flex: 1
                }}
            >

                <View
                    style={{
                        flexDirection: 'row'
                    }}
                >
                    <View
                        style={{
                            flexGrow: 6
                        }}
                    >
                        <Picker
                            
                            selectedValue={orderCustomerId}
                            onValueChange={(itemValue, itemIndex) =>
                                setOrderCustomerId(itemValue)
                            }>
                            {
                                customers.map(c => {
                                    return <Picker.Item label={c.customerName} value={c.customerId} />
                                })
                            }

                        </Picker>
                    </View>
                    <View
                        style={{
                            flexGrow: 2,
                            flexDirection: 'row'
                        }}
                    >
                        <TextInput
                            style={{
                                flexGrow: 1
                            }}
                            onChangeText={text => setOrderId(text)}
                            placeholder={orderId}
                            value={orderId}
                            keyboardType="numeric"
                        />
                        <Button
                            style={{
                                flexGrow: 1,
                            }}
                            onPress={createNewOrderId}
                            title="Yeni"
                            accessibilityLabel="Yeni sipariş numarası üret"
                        />
                    </View>
                </View>

                <View>
                    <Picker
                        selectedValue={orderName}
                        onValueChange={(itemValue, itemIndex) =>
                            setOrderName(itemValue)
                        }>
                        {
                            products.map(p => {
                                return <Picker.Item label={p.productName} value={p.productId} />
                            })
                        }

                    </Picker>
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            paddingLeft: 10,
                            paddingRight: 10
                        }}
                    >
                        <TextInput
                            onChangeText={text => setOrderPrice(text)}
                            placeholder={getProductId(orderName)}
                            value={orderPrice}
                            keyboardType="numeric"
                            style={{
                                width: '50%',
                            }}
                        />
                        <Button
                            style={{
                                flexGrow: 1,
                            }}
                            onPress={() => useProductPrice(orderName)}
                            title="Kullan"
                        />
                        <TextInput
                            onChangeText={text => setOrderQuantity(text)}
                            value={orderQuantity}
                            placeholder="Adet"
                            keyboardType="numeric"
                            style={{
                                width: '50%'
                            }}
                        />
                    </View>
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#49B0AA',
                            padding: 10,
                            borderRadius: 40,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginLeft: 10,
                            marginRight: 10,
                            marginTop: 10
                        }}
                        onPress={() => addOrder()}
                    >
                        <Text>Ekle</Text>
                    </TouchableOpacity>

                </View>
                
                <ScrollView>
                    <GetOrderGroup orderId={orderId} customerId={orderCustomerId} ></GetOrderGroup>
                    
                </ScrollView>
            </BottomSheet>
            <SmallAdd></SmallAdd>
        </View>
    )
}

export default OrderAdd