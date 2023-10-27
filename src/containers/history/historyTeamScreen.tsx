import React, {useEffect, useState} from 'react';
import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Feather';

import {themeColor} from '../../utils/themes/color';
import themeFont from '../../utils/themes/font';
import ButtonComponent from '../../components/form/Button';

type ItemProps = {
  playerName: string;
  playerNumber: string;
  duration: number;
};

const HistoryTeamScreen = ({navigation}: {navigation: any}) => {
  const [soccerHubHistory, setSoccerHubHistory] = useState<ItemProps[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const handleGetData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('SoccerHubPlayerHistory');
      setSoccerHubHistory(jsonValue ? JSON.parse(jsonValue).reverse() : []);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    handleGetData();
  }, []);

  const handleClear = async () => {
    try {
      await AsyncStorage.removeItem('SoccerHubPlayerHistory');
      setSoccerHubHistory([]);
    } catch (e) {
      console.log(e);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    handleGetData();
    setRefreshing(false);
  };

  const renderItemPlayer = (item: ItemProps, index: number) => {
    return (
      <View
        key={index}
        style={{
          backgroundColor: themeColor.primary.main002,
          padding: 10,
          marginBottom: 10,
          borderRadius: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.fullName}>
            {item.playerNumber} {item.playerName}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Icon name="clock" size={20} color={'white'} />
            <Text style={styles.duration}>
              {Math.round(item.duration)} minutes
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{padding: 20, flex: 1}}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{marginTop: 10, marginBottom: 5}}
        data={soccerHubHistory}
        contentContainerStyle={{paddingBottom: 90}}
        renderItem={({item, index}) => renderItemPlayer(item, index)}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <View style={{marginTop: 25}}>
            {soccerHubHistory.length > 0 && (
              <ButtonComponent onPress={() => handleClear()} label="Clear" />
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
    flex: 1,
    fontFamily: themeFont.themeFontBold,
    fontSize: 18,
    color: themeColor.common.white,
  },
  duration: {
    alignSelf: 'center',
    alignContent: 'center',
    paddingLeft: 5,
    fontFamily: themeFont.themeFontBold,
    fontSize: 16,
    color: themeColor.common.white,
  },
});

export default HistoryTeamScreen;
