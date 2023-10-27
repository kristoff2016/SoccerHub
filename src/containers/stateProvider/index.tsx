import React, {createContext, useReducer} from 'react';
import {StatusBar, useColorScheme} from 'react-native';

import AppNavigator from '../../navigators';
import actions from '../../actions';
import reducers from '../../reducers';

export const StateContext = createContext({});
const {Provider} = StateContext;

const StateProvider = ({initialState = {}}) => {
  const [state, dispatch] = useReducer(reducers, initialState);
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider value={{state, actions: actions(dispatch)}}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppNavigator />
    </Provider>
  );
};

export default StateProvider;
