import React, {useEffect, useState} from 'react';
import {accelerometer, setUpdateIntervalForType} from 'react-native-sensors';
import {Button, Text, View} from 'react-native';
import {mean, normalize} from '../utils/math';
import AsyncStorage from '@react-native-async-storage/async-storage';

enum State {
  WAITING,
  RECORDING,
  FINISHED_RECORDING,
  SAVING,
}
const shakeStorageKey = 'VibrationMeterShakeStorageKey';
const pillStorageKey = 'PillStorageKey';

const VibrationMeter = () => {
  const [vibrationData, setVibrationData] = useState<Array<number>>([]);
  const [showData, setShowData] = useState<Array<Element>>([]);
  const [phase, setPhase] = useState(State.WAITING);
  const [error, setError] = useState('');
  const [pillsTaken, setPillsTaken] = useState<Array<string>>([]);
  useEffect(() => {
    const readData = async () => {
      const prevData = await AsyncStorage.getItem(shakeStorageKey).then(json =>
        json ? JSON.parse(json) : [],
      );

      await AsyncStorage.setItem(shakeStorageKey, JSON.stringify(prevData));
      setShowData(
        prevData
          ? prevData.map((data: any, index: number) => (
              <Text key={index}>
                {data.timestamp + ':' + data.vibrationData?.length}
              </Text>
            ))
          : [<Text>Empty</Text>],
      );
    };
    const readPillsTaken = async () => {
      const ar = await AsyncStorage.getItem(pillStorageKey).then(json =>
        json ? JSON.parse(json) : [],
      );
      setPillsTaken(ar);
    };
    readData();
    readPillsTaken();
  }, []);
  const recordShakes = () => {
    setPhase(State.RECORDING);
    setVibrationData([]);
    setUpdateIntervalForType('accelerometer', 30);
    const subscription = accelerometer.subscribe(({x, y, z}) => {
      const acceleration = Math.sqrt(x ** 2 + y ** 2 + z ** 2);
      setVibrationData(prevData => [...prevData, acceleration]);
    });

    setTimeout(() => {
      subscription.unsubscribe();
      setPhase(State.FINISHED_RECORDING);
    }, 10000);

    return () => {
      subscription.unsubscribe();
    };
  };

  const handleSave = async () => {
    setPhase(State.SAVING);
    const timestamp = new Date().toISOString();
    try {
      const prevData = await AsyncStorage.getItem(shakeStorageKey).then(json =>
        json ? JSON.parse(json) : [],
      );

      const newData = [...prevData, {timestamp, vibrationData}];
      await AsyncStorage.setItem(shakeStorageKey, JSON.stringify(newData));
      setShowData(
        newData
          ? newData.map((data: any, index: number) => (
              <Text key={index}>
                {data.timestamp +
                  ':' +
                  data.vibrationData?.length +
                  ', ~' +
                  mean(data)}
              </Text>
            ))
          : [<Text>Empty</Text>],
      );
      setPhase(State.WAITING);
    } catch (e: any) {
      setError(e.message);
      setPhase(State.FINISHED_RECORDING);
    }
  };

  const takeAPill = async () => {
    const timestamp = new Date().toISOString();
    const prevData = await AsyncStorage.getItem(pillStorageKey).then(json =>
      json ? JSON.parse(json) : [],
    );
    const newData = [...prevData, {timestamp}];
    await AsyncStorage.setItem(pillStorageKey, JSON.stringify(newData));
    setPillsTaken(newData);
  };

  const noenData =
    phase === State.FINISHED_RECORDING
      ? normalize(vibrationData.slice(-10)).reduce(
          (s, n) => s + ':' + n.toFixed(2),
          'x',
        )
      : '';

  const snittVisning =
    phase === State.FINISHED_RECORDING
      ? mean(normalize(vibrationData)) * 100
      : 0;

  const handleUpload = async () => {
    await AsyncStorage.removeItem(shakeStorageKey);
    await AsyncStorage.removeItem(pillStorageKey);
    setShowData([]);
    setPillsTaken([]);
  };

  return (
    <>
      <View
        style={{
          width: '100%',
          padding: 2,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 5,
          marginHorizontal: 5,
        }}>
        <Button
          title={'Record shakes'}
          onPress={recordShakes}
          disabled={phase !== State.WAITING}
        />
        <Button title={'Take a pill'} onPress={takeAPill} />
      </View>
      <Text> Pills taken: {pillsTaken.length} </Text>
      <Text>VibrationData: {vibrationData.length} </Text>
      {phase === State.FINISHED_RECORDING && <Text>noenData: {noenData} </Text>}
      {phase === State.FINISHED_RECORDING && (
        <Text>snitt: {snittVisning} </Text>
      )}
      <View
        style={{
          width: '100%',
          padding: 2,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 5,
          marginHorizontal: 5,
        }}>
        <Button
          title={'Save to phone'}
          onPress={handleSave}
          disabled={phase !== State.FINISHED_RECORDING}
        />
        <Button
          title={'Discard data'}
          onPress={() => setPhase(State.WAITING)}
          disabled={phase !== State.FINISHED_RECORDING}
        />
      </View>
      {error && <Text style={{color: 'red'}}>error: {error} </Text>}
      {showData}
      <Button title={'Slett'} disabled onPress={handleUpload} />
    </>
  );
};
export default VibrationMeter;
