import React from 'react';
import {
  AnimatedTabBarNavigator,
  DotSize,
  TabElementDisplayOptions,
} from 'react-native-animated-nav-tab-bar';
import Icon from 'react-native-vector-icons/Feather';
import {themeColor} from '../utils/themes/color';
import TeamStack from './stacks/teamStack';
import ExploreStack from './stacks/exploreStack';
import HistoryStack from './stacks/historyStack';

const Tabs = AnimatedTabBarNavigator();

const TabBarIcon = (props: any) => {
  return (
    <Icon
      name={props.name}
      size={props.size ? props.size : 24}
      color={props.tintColor}
    />
  );
};

export default () => (
  <Tabs.Navigator
    initialRouteName="Home"
    tabBarOptions={{
      activeTintColor: themeColor.common.white,
      inactiveTintColor: themeColor.text.primary,
      activeBackgroundColor: themeColor.primary.main,
    }}
    appearance={{
      shadow: true,
      floating: true,
      whenActiveShow: TabElementDisplayOptions.BOTH,
      dotSize: DotSize.SMALL,
    }}>
    <Tabs.Screen
      name="Home"
      component={ExploreStack}
      options={{
        tabBarIcon: ({focused, color}: {focused: string; color: string}) => (
          <TabBarIcon
            focused={focused}
            tintColor={color}
            name="menu"
            size={28}
          />
        ),
      }}
    />
    <Tabs.Screen
      name="History"
      component={HistoryStack}
      options={{
        tabBarIcon: ({focused, color}: {focused: string; color: string}) => (
          <TabBarIcon
            focused={focused}
            tintColor={color}
            name="clock"
            size={28}
          />
        ),
      }}
    />
    <Tabs.Screen
      name="My team"
      component={TeamStack}
      options={{
        tabBarIcon: ({focused, color}: {focused: string; color: string}) => (
          <TabBarIcon
            focused={focused}
            tintColor={color}
            name="users"
            size={28}
          />
        ),
      }}
    />
  </Tabs.Navigator>
);
