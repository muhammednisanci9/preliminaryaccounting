import { View, Text, FlatList, TouchableOpacity, styles, Image } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductList = () => {

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


    const ListItem = ({ product }) => {


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
                        >{product?.productName}</Text>
                    </View>
                    <View>
                        <Text
                            style={{
                                fontSize: 13,
                                color: 'grey',
                            }}
                        >{product?.date}</Text>
                        <Text
                            style={{
                                fontSize: 15,
                                color: '#111',
                                textAlign: 'right'
                            }}
                        >{product?.productPrice} ₺</Text>
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
                onPress={() => getProductsFromUserDevice()}
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
                data={products}
                renderItem={({ item }) => <ListItem product={item} />}
            />
        </View>
    )
}

export default ProductList