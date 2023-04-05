import React, {useEffect, useState} from 'react';
import {accelerometer, setUpdateIntervalForType} from 'react-native-sensors';
import {Text, View} from 'react-native';
import {mean, normalize} from '../utils/math';
const VibrationMeter = () => {
  const [vibrationData, setVibrationData] = useState<Array<number>>([]);
  const [finished, setFinished] = useState(false);
  useEffect(() => {
    if (finished) return;
    setUpdateIntervalForType('accelerometer', 30);
    const subscription = accelerometer.subscribe(({x, y, z}) => {
      const acceleration = Math.sqrt(x ** 2 + y ** 2 + z ** 2);
      setVibrationData(prevData => [...prevData, acceleration]);
    });

    setTimeout(() => {
      subscription.unsubscribe();
      setFinished(true);
    }, 10000);

    return () => {
      subscription.unsubscribe();
    };
  }, [finished]);

  const noenData = finished
    ? normalize(vibrationData.slice(-10)).reduce(
        (s, n) => s + ':' + n.toFixed(2),
        'x',
      )
    : '';

  const snitt = finished ? mean(normalize(vibrationData)) * 100 : 0;

  return (
    <View>
      <Text>VibrationData: {vibrationData.length} </Text>
      <Text>Finished: {finished ? 'Jepp' : 'Nope'}</Text>
      {finished && <Text>noenData: {noenData} </Text>}
      {finished && <Text>snitt: {snitt} </Text>}
    </View>
  );
};
export default VibrationMeter;
