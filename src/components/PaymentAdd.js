import { View, TextInput, Button, Text, Alert, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import SelectDropdown from 'react-native-select-dropdown';
import { Picker } from '@react-native-picker/picker';
import BottomSheet from "react-native-gesture-bottom-sheet";

const PaymentAdd = () => {

    const [customers, setCustomers] = React.useState(['customers']);

    const [payments, setPayments] = React.useState([]);

    const bottomSheet = React.useRef();

    const [paymentId, setPaymentId] = React.useState('');
    const [paymentCustomerId, setPaymentCustomerId] = React.useState('');
    const [paymentPrice, setPaymentPrice] = React.useState('');



    const date = new Date().getDate(); //Current Date
    const month = new Date().getMonth() + 1; //Current Month
    const year = new Date().getFullYear(); //Current Year
    const addToTime = date + '/' + month + '/' + year;


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

    React.useEffect(() => {
        saveOrderToUserDevice(payments);
    }, [payments]);

    const addOrder = () => {
        if (paymentPrice == '') {
            Alert.alert('Error', 'Please input word');
        } else {
            const newOrder = {
                paymentId: paymentId,
                paymentCustomerId: paymentCustomerId,
                paymentPrice: paymentPrice,
                date: addToTime,
            };
            setPayments([...payments, newOrder]);
            setPaymentPrice('');
        }
    };

    const saveOrderToUserDevice = async payments => {
        try {
            const stringifyPayments = JSON.stringify(payments);
            await AsyncStorage.setItem('payments', stringifyPayments);
        } catch (error) {
            console.log(error);
        }
    };

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

    const createNewPaymentId = () => {

        const getBigPaymentId = payments.map(getPaymentsId => getPaymentsId.paymentId);
        let getList =  getBigPaymentId.sort((a, b) => a-b).reverse();
        let newPaymentId = parseInt(getList[0]) + 1;
        if(isNaN(newPaymentId.toString())){
            setPaymentId('1');
        }else{
            setPaymentId(newPaymentId.toString());
        }
        
    }

    const SmallAdd = () => {
        return (
            <TouchableOpacity
                onPress={() => {bottomSheet.current.show(); createNewPaymentId()}}
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


    return (
        <View>

            <BottomSheet hasDraggableIcon ref={bottomSheet} height={200}
                style={{
                    flex: 1
                }}
            >

                <View>
                    <Picker
                        selectedValue={paymentCustomerId}
                        onValueChange={(itemValue, itemIndex) =>
                            setPaymentCustomerId(itemValue)
                        }>
                        {
                            customers.map(c => {
                                return <Picker.Item label={c.customerName} value={c.customerId} />
                            })
                        }

                    </Picker>
                </View>

                <View>
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            paddingLeft: 10,
                            paddingRight: 10
                        }}
                    >
                        <TextInput
                            onChangeText={text => setPaymentPrice(text)}
                            value={paymentPrice}
                            placeholder="Ödenen Tutar"
                            keyboardType="numeric"
                            style={{
                                width: '50%',
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
                        onPress={() => {addOrder(), bottomSheet.current?.close()}}
                    >
                        <Text>Ekle</Text>
                    </TouchableOpacity>

                </View>
            </BottomSheet>
            <SmallAdd></SmallAdd>
        </View>
    )
}

export default PaymentAdd