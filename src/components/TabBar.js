import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Home from '../screens/Home';

const TabBar = ({ state, descriptors, navigation }) => {

  return (
    <View style={styles.barItemContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };


        const bottomSheet = React.useRef();



        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={() => bottomSheet.current.show()}
            style={{ flex: 1 }}
          >
            <View
              style={[isFocused ? styles.activeItem : styles.normallyItem]}
            >
              { label == 'Home' ? <Image
                source={require('../../assets/image/home.png')}
                style={{ width: 30, height: 30 }}
              /> : false}
              { label == 'Siparişler' ? <Image
                source={require('../../assets/image/order-food.png')}
                style={{ width: 30, height: 30 }}
              /> : false}
              { label == 'Müşteriler' ? <Image
                source={require('../../assets/image/customer.png')}
                style={{ width: 30, height: 30 }}
              /> : false}
              { label == 'Ürünler' ? <Image
                source={require('../../assets/image/products.png')}
                style={{ width: 30, height: 30 }}
              /> : false}
              { label == 'Ödemeler' ? <Image
                source={require('../../assets/image/payments.png')}
                style={{ width: 30, height: 30 }}
              /> : false}
              
              {/* <Text style={{ fontSize: 12 }}>
                {label}
              </Text> */}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}


const styles = StyleSheet.create({
  activeItem: {
    backgroundColor: '#E6ECF4',
    borderRadius: 15,
    padding: 5,
    textAlign: 'center',
    alignItems: 'center',
  },
  normallyItem: {
    padding: 10,
    textAlign: 'center',
    alignItems: 'center'
  },
  barItemContainer: {
    width: '97%',
    marginLeft: '1.5%',
    marginBottom: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#111',
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 5,
    paddingLeft: 5,
    borderColor: '#111',
    borderTopWidth: 1
  },
  barItem: {
    backgroundColor: '#fee401',
    borderRadius: 30,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 40
  },
  barItemHide: {
    width: '25%',
    alignItems: 'center'
  },
  barItemImg: {
    width: 20,
    height: 20,
  },
  barItemImgHide: {
    width: 20,
    height: 20
  }
});


export default TabBar