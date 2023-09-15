import { View, Text, TouchableOpacity, Image, BackHandler } from 'react-native'
import React from 'react'

const Header = ({title, navigation}) => {
    return (
        <View
            style={{
                width: '100%',
                backgroundColor: '#fff',
                paddingLeft: '1.5%',
                paddingRight: '1.5%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: 10,
                paddingBottom: 10,
            }}
        >   
            <View>
                <TouchableOpacity
                    style={{
                        borderRadius: 10,
                        padding: 10,
                        marginRight: 10
                    }}
                >
                    <Image
                        source={require('../../assets/image/back.png')}
                        style={{ width: 25, height: 25 }}
                    />
                </TouchableOpacity>
            </View>
            <Text
                style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: '#111'
                }}
            >{title}</Text>
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                }}
            >
                
                <TouchableOpacity
                    style={{
                        borderRadius: 10,
                        padding: 10
                    }}
                >
                    <Text style={{ width: 25, height: 25 }}></Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Header