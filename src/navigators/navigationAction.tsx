import React from 'react';
import {StackActions} from '@react-navigation/native';

const isReadyRef = React.createRef<any>();
const navigationRef = React.createRef<any>();

class NavigationAction {
  static navigate(name: string, params = {}) {
    if (!navigationRef.current) {
      return;
    }
    navigationRef.current?.navigate(name, params);
  }

  static back() {
    if (!navigationRef.current) {
      return;
    }
    navigationRef.current?.goBack();
  }

  static reset(name: string, params = {}) {
    if (!navigationRef.current) {
      return;
    }
    navigationRef.current?.dispatch(StackActions.replace(name, params));
  }
}

export default NavigationAction;
export {navigationRef, isReadyRef};
