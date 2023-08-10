import React, {useState} from 'react';
import {accelerometer, setUpdateIntervalForType} from 'react-native-sensors';
import {Button, StyleSheet, Text, useColorScheme, View} from 'react-native';
import {mean, normalize} from '../utils/math';
import {pillStorageKey, shakeStorageKey} from '../utils/constants';
import {useAsyncStorage} from '../hooks/useAsyncStorage';
import PillLogger from './PillLogger';
import Knapperad from '../UI/Knapperad';

enum State {
  WAITING,
  RECORDING,
  FINISHED_RECORDING,
  SAVING,
}

const HvorRystende = ({navigation}: any) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [pillsTaken, setPillsTaken] = useAsyncStorage(pillStorageKey);
  const [calmPeriod, setCalmPeriod] = useAsyncStorage(pillStorageKey);
  const [rawData, setRawData] = useState<Array<number>>([]);
  const [shakeRecords, setShakeRecords] = useAsyncStorage(shakeStorageKey);

  const [phase, setPhase] = useState(State.WAITING);

  const showData = shakeRecords
    ? shakeRecords.map((data: any, index: number) => (
        <Text key={index}>
          {data.timestamp + ':' + data.vibrationData?.length}
        </Text>
      ))
    : [<Text>Empty</Text>];

  const recordShakes = () => {
    setPhase(State.RECORDING);
    setRawData([]);
    setUpdateIntervalForType('accelerometer', 30);
    const subscription = accelerometer.subscribe(({x, y, z}) => {
      const acceleration = Math.sqrt(x ** 2 + y ** 2 + z ** 2);
      setRawData(prevData => [...prevData, acceleration]);
    });

    setTimeout(() => {
      subscription.unsubscribe();
      setPhase(State.FINISHED_RECORDING);
    }, 10000);
  };

  const handleSave = async () => {
    setPhase(State.SAVING);
    const timestamp = new Date().toISOString();
    const newData = [...shakeRecords, {timestamp, vibrationData: rawData}];
    await setShakeRecords(newData).then(() => {
      setRawData([]);
      setPhase(State.WAITING);
    });
  };

  const handleDiscard = () => {
    setRawData([]);
    setPhase(State.WAITING);
  };

  const snittVisning =
    phase === State.FINISHED_RECORDING ? mean(normalize(rawData)) * 100 : 0;

  const handleUpload = async () => {
    if (phase === State.FINISHED_RECORDING) await handleSave();
    navigation.navigate('CloudStorage');
  };

  const disableSaveOrDiscard = phase !== State.FINISHED_RECORDING;

  return (
    <View>
      <Knapperad>
        <View>
          <Button
            title={'Opptak'}
            onPress={recordShakes}
            disabled={phase !== State.WAITING}
          />
        </View>
        <PillLogger pillsTaken={pillsTaken} setPillsTaken={setPillsTaken} />
      </Knapperad>
      <Text style={isDarkMode ? styles.textDark : styles.text}>
        Data: {rawData.length}{' '}
      </Text>
      <Text style={isDarkMode ? styles.textDark : styles.text}>
        snitt: {snittVisning}{' '}
      </Text>
      <Knapperad>
        <Button
          title={'Lagre til telefon'}
          onPress={handleSave}
          disabled={disableSaveOrDiscard}
        />
        <Button
          title={'Slett denne'}
          onPress={handleDiscard}
          disabled={disableSaveOrDiscard}
        />
      </Knapperad>
      {showData}
      <Button title={'Last opp'} onPress={handleUpload} />
    </View>
  );
};
export default HvorRystende;

const styles = StyleSheet.create({
  text: {
    color: 'black',
  },
  textDark: {
    color: 'white',
  },
});
