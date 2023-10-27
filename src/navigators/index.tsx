import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import AppTabBar from './appTabBar';
import {navigationRef} from './navigationAction';

const SwitchNavigator = createNativeStackNavigator();

const AppContainer = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <SwitchNavigator.Navigator initialRouteName="AppTab">
        <SwitchNavigator.Screen
          options={{
            headerShown: false,
          }}
          name="AppTab"
          component={AppTabBar}
        />
      </SwitchNavigator.Navigator>
    </NavigationContainer>
  );
};

export default AppContainer;
