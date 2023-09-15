import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBar from './src/components/TabBar';
import Orders from './src/screens/Orders';
import Customers from './src/screens/Customers';
import Home from './src/screens/Home';
import Products from './src/screens/Products';
import CustomerAdd from './src/components/CustomerAdd';
import ProductAdd from './src/components/ProductAdd';
import OrderAdd from './src/components/OrderAdd';
import OrderDetail from './src/screens/OrderDetail';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrderList from './src/components/OrderList';
import CustomerList from './src/components/CustomerList';
import CustomerDetail from './src/screens/CustomerDetail';
import Payments from './src/screens/Payments';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CustomerProduct from './src/components/get/CustomerProduct';
import CustomerDebt from './src/components/get/CustomerDebt';
import CustomerSummary from './src/components/get/CustomerSummary';

const TabTop = createMaterialTopTabNavigator();




const Tab = createBottomTabNavigator();


const Stack = createNativeStackNavigator();


function CustomerTabs({ navigation }) {
  return (
    <TabTop.Navigator tabBar={props => <CustomerDetail {...props} />}>
      <TabTop.Screen name="Ürün" component={CustomerProduct} options={{ headerShown: false }}/>
      <TabTop.Screen name="Ödenen" component={CustomerDebt} options={{ headerShown: false }}/>
      <TabTop.Screen name="Özet" component={CustomerSummary} options={{ headerShown: false }}/>
    </TabTop.Navigator>
  );
}





function OrdersStack({ navigation }) {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Orders" component={Orders} options={{ headerShown: false }}/>
        <Stack.Screen name="OrderDetail" component={OrderDetail} options={{ headerShown: false }}/>
      </Stack.Navigator>
  );
}

function CustomersStack({ navigation }) {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Müşteriler" component={Customers} options={{ headerShown: false }}/>
        <Stack.Screen name="CustomerDetail" component={CustomerDetail} options={{ headerShown: false }}/>
      </Stack.Navigator>
  );
}


const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={props => <TabBar {...props} />}>
        {/* <Tab.Screen name="Home" component={Home} /> */}
        <Tab.Screen name="Siparişler" component={OrdersStack} options={{ headerShown: false }}/>
        <Tab.Screen name="Müşteriler" component={CustomersStack} options={{ headerShown: false }}/>
        <Tab.Screen name="Ürünler" component={Products} options={{ headerShown: false }}/>
        <Tab.Screen name="Ödemeler" component={Payments} options={{ headerShown: false }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}


export default App