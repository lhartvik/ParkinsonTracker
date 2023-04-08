import {Button, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const LinkPage = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Welcome to my app!</Text>
      <View style={styles.button}>
        <Button
          title="Logg Parkinsonstuff"
          // @ts-ignore
          onPress={() => navigation.navigate('VibrationMeter')}
        />
      </View>
      <View style={styles.button}>
        <Button
          title="PillEditor"
          // @ts-ignore
          onPress={() => navigation.navigate('PillEditor')}
        />
      </View>
      <View style={styles.button}>
        <Button
          title="Cloud storage"
          // @ts-ignore
          onPress={() => navigation.navigate('CloudStorage')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: 'black',
    margin: 3,
  },
});
export default LinkPage;
