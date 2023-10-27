import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import numeral from 'numeral';

export const getUserInfo = async () => {
  const userInfo = await AsyncStorage.getItem('userInfo');
  if (userInfo && JSON.parse(userInfo)?.accessToken) {
    axios.defaults.headers.common.Authorization = `Bearer ${
      JSON.parse(userInfo)?.accessToken
    }`;
  }
  return userInfo && JSON.parse(userInfo);
};

export const formatValueNumber = (str: string) => {
  if (str) {
    return numeral(str).value() || 0;
  }
  return 0;
};
