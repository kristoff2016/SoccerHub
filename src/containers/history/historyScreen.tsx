import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {themeColor} from '../../utils/themes/color';
import themeFont from '../../utils/themes/font';
import ButtonComponent from '../../components/form/Button';

type ItemProps = {soccerHub: string; opponent: string; createdAt: string};

const HistoryScreen = ({navigation}: {navigation: any}) => {
  const [soccerHubHistory, setSoccerHubHistory] = useState<ItemProps[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const handleGetData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('SoccerHubHistory');
      setSoccerHubHistory(jsonValue ? JSON.parse(jsonValue).reverse() : []);
    } catch (e) {
      console.log(e);
    }
  };

  const handleClearData = async () => {
    try {
      await AsyncStorage.removeItem('SoccerHubHistory');
      setSoccerHubHistory([]);
      Alert.alert('Data has been cleared');
    } catch (e) {
      console.log(e);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    handleGetData();
    setRefreshing(false);
  };

  useEffect(() => {
    handleGetData();
  }, []);

  const renderItem = (item: ItemProps) => {
    return (
      <View key={item.createdAt}>
        <View style={{marginBottom: 5}}>
          <Text
            style={{
              fontSize: 18,
              textAlign: 'center',
              fontFamily: themeFont.themeFontRegular,
            }}>
            {moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: themeColor.primary.main,
            padding: 15,
            borderRadius: 10,
            flexDirection: 'row',
            marginBottom: 10,
            justifyContent: 'space-between',
          }}>
          <View style={styles.team}>
            <Text style={styles.title}>
              Soccer Hub ({item.soccerHub ?? 0}){' '}
            </Text>
          </View>
          <View style={styles.team}>
            <Text style={styles.title}>Opponent ({item.opponent ?? 0})</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{padding: 20, flex: 1}}>
      <FlatList
        style={{marginBottom: 5}}
        contentContainerStyle={{paddingBottom: 80}}
        data={soccerHubHistory}
        renderItem={({item}) => renderItem(item)}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ListFooterComponent={
          <View style={{marginTop: 25}}>
            {soccerHubHistory.length > 0 && (
              <ButtonComponent
                onPress={() => handleClearData()}
                label="Clear"
              />
            )}
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  team: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    fontFamily: themeFont.themeFontBold,
    fontSize: 16,
    color: themeColor.common.white,
  },
  fullName: {
    fontFamily: themeFont.themeFontBold,
    fontSize: 18,
    color: themeColor.common.white,
  },
  time: {
    fontFamily: themeFont.themeFontBold,
    fontSize: 16,
    color: themeColor.common.white,
  },
});

export default HistoryScreen;
