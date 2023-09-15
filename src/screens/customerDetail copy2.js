import React from 'react';
import { Animated, View, TouchableOpacity, StyleSheet } from 'react-native';

const CustomerDetail = ({ state, descriptors, navigation, position }) => {


  return (
    <View style={{
      flexDirection: 'row',
      width: '97%',
      marginLeft: '1.5%',
      marginTop: 10,
      marginBottom: 10,
      borderRadius: 5,
    }}>
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

        const inputRange = state.routes.map((_, i) => i);
        const opacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map(i => (i === index ? 1 : 0)),
        });

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
          >
            <Animated.Text style={[isFocused ? styles.activeItem : styles.normallyItem]}>
              {label}
            </Animated.Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}


const styles = StyleSheet.create({
  activeItem: {
    backgroundColor: 'green',
    padding: 10,
    width: '97%',
    borderRadius: 10
  },
  normallyItem: {
    backgroundColor: 'grey',
    padding: 10,
    width: '97%',
    borderRadius: 10
  }
});



export default CustomerDetail

