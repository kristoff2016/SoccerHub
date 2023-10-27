import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {themeColor} from '../../utils/themes/color';
import themeFont from '../../utils/themes/font';
import HistoryScreen from '../../containers/history/historyScreen';
import HistoryTeamScreen from '../../containers/history/historyTeamScreen';

const RootStack = createStackNavigator();

const Tab = createMaterialTopTabNavigator();

function HistoryTabsStack() {
  return (
    <Tab.Navigator
      initialRouteName="HistoryScreen"
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 16,
          color: 'white',
          fontFamily: themeFont.themeFontRegular,
        },
        tabBarStyle: {backgroundColor: themeColor.primary.main002},
        tabBarActiveTintColor: themeColor.primary.main002,
        tabBarIndicatorStyle: {
          height: 8,
          backgroundColor: themeColor.primary.main,
        },
        tabBarInactiveTintColor: themeColor.primary.main,
      }}>
      <Tab.Screen
        name="HistoryScreen"
        options={{
          tabBarLabel: 'Match',
        }}
        component={HistoryScreen}
      />
      <Tab.Screen
        name="HistoryTeamScreen.tsx"
        options={{
          tabBarLabel: 'Players',
        }}
        component={HistoryTeamScreen}
      />
    </Tab.Navigator>
  );
}

const HistoryStack = () => {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: themeColor.primary.main,
        },
        headerTintColor: themeColor.common.white,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
      initialRouteName="HistoryTabsStack">
      <RootStack.Screen
        name="HistoryTabsStack"
        component={HistoryTabsStack}
        options={{
          headerTitle: 'History',
          headerLeft: () => null,
        }}
      />
    </RootStack.Navigator>
  );
};

export default HistoryStack;
