import {useEffect} from 'react';
import database from '@react-native-firebase/database';
import {Text, View} from 'react-native';

const CloudStorage = () => {
  useEffect(() => {
    const getData = async () => {
      await database()
        .ref('/test')
        .once('value')
        .then(snapshot => {
          console.log('Data: ', snapshot.val());
        });
    };
    getData();
  }, []);
  return (
    <View>
      <Text>Under construction</Text>
    </View>
  );
};
export default CloudStorage;
