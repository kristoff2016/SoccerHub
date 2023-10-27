import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import moment from 'moment';
import {Alert} from 'react-native';
import Modal from 'react-native-modal';
import {default as Feather} from 'react-native-vector-icons/MaterialIcons';
import ButtonComponent from '../../components/form/Button';
import {themeColor} from '../../utils/themes/color';
import themeFont from '../../utils/themes/font';

type ItemProps = {playerName: string; playerNumber: string};

const TeamScreen = ({navigation}: {navigation: any}) => {
  const [teams, setTeams] = useState<ItemProps[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [playerName, setPlayerName] = useState<string>('');
  const [playerNumber, setPlayerNumber] = useState<string>('');
  const [refreshing, setRefreshing] = useState(false);

  const handleMapping = async () => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{marginRight: 5}}
          onPress={() => setIsVisible(true)}>
          <Feather name="add" size={30} color={'white'} />
        </TouchableOpacity>
      ),
    });
  };

  const handleCreate = async () => {
    try {
      const newPlayer = {
        playerName,
        playerNumber,
      };
      const updatedTeams = teams.concat(newPlayer);
      await AsyncStorage.setItem('SoccerHub', JSON.stringify(updatedTeams));
      setTeams(updatedTeams);
      setPlayerName('');
      setPlayerNumber('');
      setIsVisible(false);
    } catch (e) {
      console.log(e);
    }
  };

  const handleRemove = async (item: ItemProps) => {
    try {
      const updatedTeams = teams.filter(player => player !== item);
      await AsyncStorage.setItem('SoccerHub', JSON.stringify(updatedTeams));
      setTeams(updatedTeams);
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddPlaying = async (item: ItemProps) => {
    try {
      const newPlayer = {
        ...item,
        createdAt: moment().format(),
      };
      const teamsPlaying = await AsyncStorage.getItem('SoccerHubPlaying');

      if (teamsPlaying === null) {
        await AsyncStorage.setItem(
          'SoccerHubPlaying',
          JSON.stringify([newPlayer]),
        );
        Alert.alert(`${item.playerName} added to playing`);
      } else {
        const teamsPlayingParse = JSON.parse(teamsPlaying);
        const checkIfTeamExists = teamsPlayingParse.find(
          (player: ItemProps) => player.playerNumber === item.playerNumber,
        );

        if (checkIfTeamExists) {
          Alert.alert(`${item.playerName} is already playing`);
        } else {
          const updatedTeamsPlaying = [...teamsPlayingParse, newPlayer];
          await AsyncStorage.setItem(
            'SoccerHubPlaying',
            JSON.stringify(updatedTeamsPlaying),
          );
          Alert.alert(`${item.playerName} added to playing`);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleGetData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('SoccerHub');
      if (jsonValue != null) {
        setTeams(JSON.parse(jsonValue).reverse());
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    handleGetData();
    setRefreshing(false);
  };

  useEffect(() => {
    handleMapping();
    handleGetData();
  }, []);

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
        <View>
          <Text style={styles.fullName}>
            {item.playerNumber} {item.playerName}
          </Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity
            style={{marginRight: 5}}
            onPress={() => handleRemove(item)}>
            <Feather name="cancel" size={30} color={'white'} />
          </TouchableOpacity>

          <TouchableOpacity
            style={{marginRight: 5, marginLeft: 10}}
            onPress={() => handleAddPlaying(item)}>
            <Feather name="add-circle" size={30} color={'white'} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View style={{padding: 20, flex: 1}}>
      <FlatList
        style={{marginTop: 10, marginBottom: 5}}
        data={teams}
        contentContainerStyle={{paddingBottom: 90}}
        renderItem={({item, index}) => renderItemPlayer(item, index)}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={
          <View style={{marginBottom: 10}}>
            <Text style={{fontSize: 18, fontFamily: themeFont.themeFontMedium}}>
              SoccerHub Squad
            </Text>
          </View>
        }
      />
      <Modal
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(false)}
        hasBackdrop={true}>
        <View
          style={{
            backgroundColor: 'white',
            padding: 15,
            borderRadius: 10,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              marginBottom: 10,
              fontSize: 18,
              fontFamily: themeFont.themeFontRegular,
            }}>
            Create New Player
          </Text>
          <TextInput
            placeholder="Enter player name"
            style={styles.textInput}
            onChangeText={e => setPlayerName(e)}
          />
          <TextInput
            placeholder="Enter player number"
            style={styles.textInput}
            onChangeText={e => setPlayerNumber(e)}
          />
          <ButtonComponent
            onPress={() => handleCreate()}
            label="Create New Player"
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  team: {
    backgroundColor: themeColor.primary.main,
    padding: 10,
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
  textInput: {
    marginBottom: 15,
    borderColor: themeColor.primary.main,
    borderWidth: 1,
    fontFamily: themeFont.themeFontRegular,
    padding: 15,
    fontSize: 16,
    borderRadius: 10,
  },
});

export default TeamScreen;
