import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TeamScreen from '../../containers/teams/teamScreen';
import {themeColor} from '../../utils/themes/color';

const RootStack = createStackNavigator();

const TeamStack = () => {
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
      initialRouteName="TeamScreen">
      <RootStack.Screen
        name="TeamScreen"
        component={TeamScreen}
        options={{
          headerTitle: 'My Team',
        }}
      />
    </RootStack.Navigator>
  );
};

export default TeamStack;
