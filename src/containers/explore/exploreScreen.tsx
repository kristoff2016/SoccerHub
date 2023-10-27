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
import {TouchableOpacity} from 'react-native-gesture-handler';
import {default as Feather} from 'react-native-vector-icons/MaterialIcons';
import ButtonComponent from '../../components/form/Button';
import {themeColor} from '../../utils/themes/color';
import themeFont from '../../utils/themes/font';
import {formatValueNumber} from '../../utils/utils';

type ItemPlayingProps = {
  playerName: string;
  playerNumber: string;
  createdAt: string;
};
type ItemProps = {
  playerName: string;
  playerNumber: string;
  duration: number;
};

const ExploreScreen = ({navigation}: {navigation: any}) => {
  const [teamsPlaying, setTeamPlaying] = useState<ItemPlayingProps[]>([]);
  const [soccerCounter, setSoccerCounter] = useState<any>();
  const [optCounter, setOptCounter] = useState<any>();
  const [refreshing, setRefreshing] = useState(false);

  const handleGetData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('SoccerHubPlaying');
      setTeamPlaying(jsonValue ? JSON.parse(jsonValue).reverse() : []);

      const storedCounter = await AsyncStorage.getItem('SoccerCounter');
      setSoccerCounter(storedCounter ? JSON.parse(storedCounter) : 0);

      const optCounter = await AsyncStorage.getItem('Optcounter');
      setOptCounter(optCounter ? JSON.parse(optCounter) : 0);
    } catch (e) {
      console.log(e);
    }
  };

  const handleMapping = async () => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{marginRight: 10}}
          onPress={() => handleRefresh()}>
          <Feather name="refresh" size={25} color={'white'} />
        </TouchableOpacity>
      ),
    });
  };

  useEffect(() => {
    handleMapping();
    handleGetData();
  }, []);

  useEffect(() => {
    handleGetData();
  }, [optCounter, soccerCounter]);

  const handleRefresh = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('SoccerHubPlaying');
      setTeamPlaying(jsonValue ? JSON.parse(jsonValue).reverse() : []);
    } catch (e) {
      console.log(e);
    }
  };

  const handleRefreshData = () => {
    setRefreshing(true);
    handleGetData();
    setRefreshing(false);
  };

  const handleRemove = async (item: ItemPlayingProps) => {
    try {
      const soccerHubPlayerHistory = await AsyncStorage.getItem(
        'SoccerHubPlayerHistory',
      );
      const formattedDateTime = moment(item.createdAt).format(
        'YYYY-MM-DD HH:mm:ss',
      );
      const timeDifference = moment
        .duration(moment().diff(formattedDateTime))
        .asMinutes()
        .toString();

      if (soccerHubPlayerHistory === null) {
        const playerHistory: ItemProps = {
          playerName: item.playerName,
          playerNumber: item.playerNumber,
          duration: Math.round(formatValueNumber(timeDifference)),
        };
        await AsyncStorage.setItem(
          'SoccerHubPlayerHistory',
          JSON.stringify([playerHistory]),
        );
      } else {
        const soccerHubPlayerHistoryParse = JSON.parse(soccerHubPlayerHistory);

        const checkIfPlayer = soccerHubPlayerHistoryParse.find(
          (player: ItemProps) => player.playerName === item.playerName,
        );

        if (checkIfPlayer) {
          const updatedPlayerHistory = soccerHubPlayerHistoryParse.map(
            (player: ItemProps) => {
              if (player.playerName === item.playerName) {
                return {
                  ...player,
                  duration: Math.round(
                    player.duration + formatValueNumber(timeDifference),
                  ),
                };
              }
              return player;
            },
          );

          await AsyncStorage.setItem(
            'SoccerHubPlayerHistory',
            JSON.stringify(updatedPlayerHistory),
          );
        } else {
          const playerHistory: ItemProps = {
            playerName: item.playerName,
            playerNumber: item.playerNumber,
            duration: Math.round(formatValueNumber(timeDifference)),
          };
          const updatedPlayerHistory = [
            ...soccerHubPlayerHistoryParse,
            playerHistory,
          ];
          await AsyncStorage.setItem(
            'SoccerHubPlayerHistory',
            JSON.stringify(updatedPlayerHistory),
          );
        }
      }
      const updatedTeams = teamsPlaying.filter(player => player !== item);
      await AsyncStorage.setItem(
        'SoccerHubPlaying',
        JSON.stringify(updatedTeams),
      );
      setTeamPlaying(updatedTeams);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSoccerAdd = async () => {
    try {
      const storedCounter = await AsyncStorage.getItem('SoccerCounter');
      let counter = storedCounter ? parseInt(storedCounter) : 0;
      counter += 1;
      await AsyncStorage.setItem('SoccerCounter', counter.toString());
      handleGetData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSoccerRemove = async () => {
    try {
      const storedCounter = await AsyncStorage.getItem('SoccerCounter');
      let counter = storedCounter ? parseInt(storedCounter) : 0;
      counter -= 1;
      await AsyncStorage.setItem('SoccerCounter', counter.toString());
      handleGetData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleOptrAdd = async () => {
    try {
      const storedCounter = await AsyncStorage.getItem('Optcounter');
      let counter = storedCounter ? parseInt(storedCounter) : 0;
      counter += 1;
      await AsyncStorage.setItem('Optcounter', counter.toString());
      handleGetData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleOptRemove = async () => {
    try {
      const storedCounter = await AsyncStorage.getItem('Optcounter');
      let counter = storedCounter ? parseInt(storedCounter) : 0;
      counter -= 1;
      await AsyncStorage.setItem('Optcounter', counter.toString());
      handleGetData();
    } catch (error) {
      console.log(error);
    }
  };

  const renderItemPlayer = (item: ItemPlayingProps) => {
    const formattedDateTime = moment(item.createdAt).format(
      'YYYY-MM-DD HH:mm:ss',
    );
    const timeDifference = moment(formattedDateTime).fromNow();
    return (
      <View
        key={item.createdAt}
        style={{
          backgroundColor: themeColor.primary.main002,
          padding: 10,
          marginBottom: 10,
          borderRadius: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View>
          <Text style={styles.fullName}>
            {item.playerNumber} {item.playerName}
          </Text>
          <Text style={styles.time}>Time left: {timeDifference} </Text>
        </View>
        <View>
          <TouchableOpacity
            style={{marginRight: 5}}
            onPress={() => handleRemove(item)}>
            <Feather name="cancel" size={30} color={'white'} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const handleFinishMatch = async () => {
    try {
      const soccerHubHistory = await AsyncStorage.getItem('SoccerHubHistory');
      const matchHistory = {
        soccerHub: soccerCounter,
        opponent: optCounter,
        createdAt: moment().format(),
      };
      if (soccerHubHistory === null) {
        await AsyncStorage.setItem(
          'SoccerHubHistory',
          JSON.stringify([matchHistory]),
        );
      } else {
        const soccerHubHistoryParse = JSON.parse(soccerHubHistory);
        const updatedTeamsPlaying = [...soccerHubHistoryParse, matchHistory];
        await AsyncStorage.setItem(
          'SoccerHubHistory',
          JSON.stringify(updatedTeamsPlaying),
        );
      }
      handleGetData();
      await AsyncStorage.removeItem('SoccerHubPlaying');
      await AsyncStorage.removeItem('Optcounter');
      await AsyncStorage.removeItem('SoccerCounter');
      setTeamPlaying([]);
      setSoccerCounter(0);
      setOptCounter(0);
      Alert.alert('Very good performance today');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={{flex: 1, padding: 20}}>
      <FlatList
        style={{marginTop: 10, marginBottom: 5}}
        data={teamsPlaying}
        contentContainerStyle={{paddingBottom: 80}}
        renderItem={({item}) => renderItemPlayer(item)}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefreshData}
          />
        }
        ListHeaderComponent={
          <View style={{marginBottom: 25}}>
            <View
              style={{
                backgroundColor: themeColor.primary.main,
                padding: 15,
                borderRadius: 10,
                flexDirection: 'row',
                marginBottom: 20,
                justifyContent: 'space-between',
              }}>
              <View style={styles.team}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity
                    onPress={() => handleSoccerRemove()}
                    style={{marginRight: 1}}>
                    <Feather name="cancel" size={25} color={'white'} />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => handleSoccerAdd()}
                    style={{marginRight: 5, marginLeft: 5}}>
                    <Feather name="add-circle" size={25} color={'white'} />
                  </TouchableOpacity>
                </View>

                <Text style={styles.title}>Soccer ({soccerCounter ?? 0}) </Text>
              </View>
              <View style={styles.team}>
                <Text style={styles.title}>Opt ({optCounter ?? 0})</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity
                    onPress={() => handleOptRemove()}
                    style={{marginRight: 1, marginLeft: 5}}>
                    <Feather name="cancel" size={25} color={'white'} />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => handleOptrAdd()}
                    style={{marginRight: 5, marginLeft: 5}}>
                    <Feather name="add-circle" size={25} color={'white'} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <Text style={{fontSize: 18, fontFamily: themeFont.themeFontMedium}}>
              Soccer Hub is playing
            </Text>
          </View>
        }
        ListFooterComponent={
          <ButtonComponent
            onPress={() => handleFinishMatch()}
            label="Finish this match"
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  team: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontFamily: themeFont.themeFontBold,
    fontSize: 16,
    flex: 1,
    color: themeColor.common.white,
  },
  fullName: {
    fontFamily: themeFont.themeFontBold,
    fontSize: 22,
    color: themeColor.common.white,
  },
  time: {
    fontFamily: themeFont.themeFontBold,
    fontSize: 16,
    color: themeColor.common.white,
  },
});

export default ExploreScreen;
