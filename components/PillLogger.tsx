import {Button, Text, View} from 'react-native';
import React from 'react';

type PillLoggerProps = {
  pillsTaken: {timestamp: string}[];
  setPillsTaken: Function;
};

const PillLogger = ({pillsTaken, setPillsTaken}: PillLoggerProps) => {
  const takeAPill = async () => {
    const timestamp = new Date().toISOString();
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

  const tider = pillsTaken.map((t: {timestamp: string}) => {
    return <Text key={`pilletid${t.timestamp}`}>{t.timestamp}</Text>;
  });

  return (
    <View>
      <Text> Piller: {pillsTaken.length} </Text>
      <Text> I dag: {filteredTimestamps.length} </Text>
      <Button title={'Ta en pille'} onPress={takeAPill} />
      {tider}
    </View>
  );
};
export default PillLogger;
