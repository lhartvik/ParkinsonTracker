import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, useColorScheme} from 'react-native';

const TidSiden = ({siste}: {siste: string}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [time, setTime] = useState<Date>(new Date());

  const diffTime = Math.abs(time.getTime() - Date.parse(siste));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 20000);

    return () => clearInterval(timer);
  }, []);

  const timer = Math.floor(diffTime / (1000 * 60 * 60));
  const minutter = (diffTime % (1000 * 60 * 60)) / (1000 * 60);

  const formattedTime = `${timer.toFixed(0)}t ${minutter.toFixed(0)}m`;

  if (timer > 24) {
    return (
      <Text style={isDarkMode ? styles.textDark : styles.text}>Over 24t</Text>
    );
  }

  return (
    <Text style={isDarkMode ? styles.textDark : styles.text}>
      {formattedTime}
    </Text>
  );
};

export default TidSiden;

const styles = StyleSheet.create({
  text: {
    color: 'black',
  },
  textDark: {
    color: 'white',
  },
});
