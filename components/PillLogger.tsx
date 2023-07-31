import {Button, StyleSheet, Text, useColorScheme, View} from 'react-native';
import React from 'react';
import {useAsyncStorage} from '../hooks/useAsyncStorage';
import TidSiden from './TidSiden';
import {sistePilleStorageKey} from '../utils/constants';

type PillLoggerProps = {
  pillsTaken: {timestamp: string}[];
  setPillsTaken: Function;
};

const PillLogger = ({pillsTaken, setPillsTaken}: PillLoggerProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [sistePille, setSistePille] = useAsyncStorage(sistePilleStorageKey);
  const takeAPill = async () => {
    const timestamp = new Date().toISOString();
    setSistePille([timestamp]);
    await setPillsTaken([...pillsTaken, {timestamp}]);
  };

  const today = new Date();

  const filteredTimestamps = pillsTaken.filter(({timestamp}) => {
    const dag = new Date(timestamp).getDate();
    const måned = new Date(timestamp).getMonth();
    const år = new Date(timestamp).getFullYear();
    return (
      dag === today.getDate() &&
      måned === today.getMonth() &&
      år === today.getFullYear()
    );
  });

  return (
    <View>
      <Text style={isDarkMode ? styles.textDark : styles.text}>
        {' '}
        Piller: {pillsTaken.length}{' '}
      </Text>
      <Text style={isDarkMode ? styles.textDark : styles.text}>
        {' '}
        I dag: {filteredTimestamps.length}{' '}
      </Text>
      <Button title={'Ta en pille'} onPress={takeAPill} />
      {sistePille.length !== 0 ? (
        <TidSiden siste={sistePille[0]} />
      ) : (
        <Text style={isDarkMode ? styles.textDark : styles.text}>
          {' '}
          Ingen piller registrert{' '}
        </Text>
      )}
    </View>
  );
};
export default PillLogger;

const styles = StyleSheet.create({
  text: {
    color: 'black',
  },
  textDark: {
    color: 'white',
  },
});
