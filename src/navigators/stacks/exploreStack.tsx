import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ExploreScreen from '../../containers/explore/exploreScreen';
import {themeColor} from '../../utils/themes/color';

const RootStack = createStackNavigator();

const ExploreStack = () => {
  return (
    <RootStack.Navigator
      initialRouteName="ExploreScreen"
      screenOptions={{
        headerStyle: {
          backgroundColor: themeColor.primary.main,
        },
        headerTintColor: themeColor.common.white,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <RootStack.Screen
        name="ExploreScreen"
        options={{
          headerTitle: 'Soccer Hub',
        }}
        component={ExploreScreen}
      />
    </RootStack.Navigator>
  );
};

export default ExploreStack;
