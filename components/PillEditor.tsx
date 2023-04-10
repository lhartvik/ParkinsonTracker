import {Button, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {pillStorageKey} from '../utils/constants';

const PillEditor = () => {
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
      title={`delete ${ts.timestamp}`}
      onPress={() => deletePillTime(ts.timestamp)}
    />
  ));

  return <View>{pillList}</View>;
};
export default PillEditor;
