import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';

const TidSiden = ({siste}: {siste: string}) => {
  const [time, setTime] = useState<Date>(new Date());

  const diffTime = Math.abs(time.getTime() - Date.parse(siste));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 20000);

    return () => clearInterval(timer);
  }, []);

  const timer = diffTime / (1000 * 60 * 60);
  const minutter = (diffTime % (1000 * 60 * 60)) / (1000 * 60);

  const formattedTime = `${timer.toFixed(0)}t ${minutter.toFixed(0)}m`;

  if (timer > 24) return <Text>Over 24t</Text>;

  return <Text>{formattedTime}</Text>;
};

export default TidSiden;
