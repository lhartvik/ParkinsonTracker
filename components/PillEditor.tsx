import {Button, StyleSheet, Text, useColorScheme, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {pillStorageKey} from '../utils/constants';

const PillEditor = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [pillTimes, setPillTimes] = useState<Array<{timestamp: string}>>([]);
  useEffect(() => {
    const readPillsTaken = async () => {
      const ar = await AsyncStorage.getItem(pillStorageKey).then(json =>
        json ? JSON.parse(json) : [],
      );
      setPillTimes(ar);
    };
    readPillsTaken();
  }, []);

  const deletePillTime = async (ts: string) => {
    const prevData = await AsyncStorage.getItem(pillStorageKey).then(json =>
      json ? JSON.parse(json) : [],
    );
    const dataWithoutSelectedPillTime = prevData.filter(
      (t: {timestamp: string}) => t.timestamp !== ts,
    );
    await AsyncStorage.setItem(
      pillStorageKey,
      JSON.stringify(dataWithoutSelectedPillTime),
    );
    setPillTimes(dataWithoutSelectedPillTime);
  };

  const pillList = pillTimes.map(ts => (
    <Button
      key={`${ts.timestamp}`}
      title={`Slett ${ts.timestamp}`}
      onPress={() => deletePillTime(ts.timestamp)}
    />
  ));

  return (
    <View style={isDarkMode ? styles.containerDark : styles.container}>
      <Text style={isDarkMode ? styles.textDark : styles.text}>
        Slett pilletider:
      </Text>
      {pillList}
    </View>
  );
};
export default PillEditor;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  containerDark: {
    flex: 1,
    backgroundColor: 'black',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  text: {
    color: 'black',
  },
  textDark: {
    color: 'white',
  },
});
