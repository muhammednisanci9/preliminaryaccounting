import { View, TextInput, Button, Text, Alert, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomSheet from "react-native-gesture-bottom-sheet";
import TabBar from './TabBar';

const ProductAdd = () => {

    const [products, setProducts] = React.useState([]);

    const [productId, setProductId] = React.useState('');
    const [productName, setProductName] = React.useState('');
    const [productPrice, setProductPrice] = React.useState('');




    const date = new Date().getDate(); //Current Date
    const month = new Date().getMonth() + 1; //Current Month
    const year = new Date().getFullYear(); //Current Year
    const addToTime = date + '/' + month + '/' + year;




    const bottomSheet = React.useRef();


    React.useEffect(() => {
        getProductsFromUserDevice();
    }, []);

    React.useEffect(() => {
        saveProductToUserDevice(products);
    }, [products]);

    const addProduct = () => {
        if (productName == '') {
            Alert.alert('Error', 'Please input word');
        } else {
            const newProduct = {
                productId: productId,
                productName: productName,
                productPrice: productPrice,
                date: addToTime,
            };
            setProducts([...products, newProduct]);
            setProductName('');
            setProductPrice('');
        }
    };

    const saveProductToUserDevice = async products => {
        try {
            const stringifyProducts = JSON.stringify(products);
            await AsyncStorage.setItem('products', stringifyProducts);
        } catch (error) {
            console.log(error);
        }
    };

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

    const createNewProductId = () => {

        const getBigProductId = products.map(getProductsId => getProductsId.productId);
        let getList =  getBigProductId.sort((a, b) => a-b).reverse();
        let newProductId = parseInt(getList[0]) + 1;
        if(isNaN(newProductId.toString())){
            setProductId('1');
        }else{
            setProductId(newProductId.toString());
        }
        
    }


    const SmallAdd = () => {
        return (
            <TouchableOpacity
                onPress={() => {bottomSheet.current.show(); createNewProductId()}}
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
            <BottomSheet hasDraggableIcon ref={bottomSheet} height={200} >
                <TextInput
                    onChangeText={text => setProductName(text)}
                    value={productName}
                    placeholder="Ürün Adı"
                    style={{
                        marginLeft: 10,
                        marginRight: 10
                    }}
                />
                <TextInput
                    onChangeText={text => setProductPrice(text)}
                    value={productPrice}
                    placeholder="Ürün Fiyatı"
                    keyboardType="numeric"
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
                    onPress={() => {addProduct(); bottomSheet.current?.close()}}
                >
                    <Text>Ekle</Text>
                </TouchableOpacity>

            </BottomSheet>
            <SmallAdd></SmallAdd>
        </View>
    )
}

export default ProductAdd