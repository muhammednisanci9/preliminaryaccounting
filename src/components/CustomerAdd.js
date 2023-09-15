import { View, TextInput, Button, Text, Alert, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomSheet from "react-native-gesture-bottom-sheet";

const CustomerAdd = () => {

    const [customers, setCustomers] = React.useState([]);

    const [customerId, setCustomerId] = React.useState('');
    const [customerName, setCustomerName] = React.useState('');
    const [customerCompany, setCustomerCompany] = React.useState('');
    const [customerMail, setCustomerMail] = React.useState('');
    const [customerNumber, setCustomerNumber] = React.useState('');



    const date = new Date().getDate(); //Current Date
    const month = new Date().getMonth() + 1; //Current Month
    const year = new Date().getFullYear(); //Current Year
    const addToTime = date + '/' + month + '/' + year;


    const bottomSheet = React.useRef();





    React.useEffect(() => {
        getCustomersFromUserDevice();
    }, []);

    React.useEffect(() => {
        saveCustomerToUserDevice(customers);
    }, [customers]);

    const addCustomer = () => {
        if (customerName == '') {
            Alert.alert('Error', 'Please input word');
        } else {
            const newCustomer = {
                customerId: customerId,
                customerName: customerName,
                customerCompany: customerCompany,
                customerMail: customerMail,
                customerNumber: customerNumber,
                date: addToTime,
            };
            setCustomers([...customers, newCustomer]);
            setCustomerName('');
            setCustomerCompany('');
            setCustomerMail('');
            setCustomerNumber('');
        }
    };

    const saveCustomerToUserDevice = async customers => {
        try {
            const stringifyCustomers = JSON.stringify(customers);
            await AsyncStorage.setItem('customers', stringifyCustomers);
        } catch (error) {
            console.log(error);
        }
    };

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

    const createNewCustomerId = () => {

        const getBigCustomerId = customers.map(getCustomersId => getCustomersId.customerId);
        let getList =  getBigCustomerId.sort((a, b) => a-b).reverse();
        let newCustomerId = parseInt(getList[0]) + 1;
        if(isNaN(newCustomerId.toString())){
            setCustomerId('1');
        }else{
            setCustomerId(newCustomerId.toString());
        }
        
    }

    const SmallAdd = () => {
        return (
            <TouchableOpacity
                onPress={() => {bottomSheet.current.show(); createNewCustomerId()}}
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
            <BottomSheet hasDraggableIcon ref={bottomSheet} height={290} >
                <TextInput
                    onChangeText={text => setCustomerName(text)}
                    value={customerName}
                    placeholder="Müşteri Adı"
                    style={{
                        marginLeft: 10,
                        marginRight: 10
                    }}
                />
                <TextInput
                    onChangeText={text => setCustomerCompany(text)}
                    value={customerCompany}
                    placeholder="Firma Adı"
                    style={{
                        marginLeft: 10,
                        marginRight: 10
                    }}
                />
                <TextInput
                    onChangeText={text => setCustomerNumber(text)}
                    value={customerNumber}
                    placeholder="Telefon Numarası"
                    style={{
                        marginLeft: 10,
                        marginRight: 10
                    }}
                />
                <TextInput
                    onChangeText={text => setCustomerMail(text)}
                    value={customerMail}
                    placeholder="Mail Adresi"
                    style={{
                        marginLeft: 10,
                        marginRight: 10
                    }}
                />

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
                    onPress={() => {addCustomer(); bottomSheet.current?.close()}}
                >
                    <Text>Ekle</Text>
                </TouchableOpacity>

            </BottomSheet>
            <SmallAdd></SmallAdd>
        </View>
    )
}

export default CustomerAdd