import {Button, Text, View} from 'react-native';
import React from 'react';

type PillLoggerProps = {
  pillsTaken: string[];
  setPillsTaken: Function;
};

const PillLogger = ({pillsTaken, setPillsTaken}: PillLoggerProps) => {
  const takeAPill = async () => {
    const timestamp = new Date().toISOString();
    await setPillsTaken([...pillsTaken, {timestamp}]);
  };

  return (
    <View>
      <Text> Pills taken: {pillsTaken.length} </Text>
      <Button title={'Take a pill'} onPress={takeAPill} />
    </View>
  );
};
export default PillLogger;
