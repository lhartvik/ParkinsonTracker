import {Button, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const LinkPage = () => {
  const navigation = useNavigation();

  return (
    <View>
      <View style={styles.button}>
        <Button
          color="rgba(0, 0, 0, 0)"
          title="Logg skjelving og piller"
          // @ts-ignore
          onPress={() => navigation.navigate('Hvor rystende')}
        />
      </View>
      <View style={styles.button}>
        <Button
          color="rgba(0, 0, 0, 0)"
          title="Se og slett pilletider"
          // @ts-ignore
          onPress={() => navigation.navigate('Redigere Pilletider')}
        />
      </View>
      <View style={styles.button}>
        <Button
          color="rgba(0, 0, 0, 0)"
          title="Medisinplan"
          // @ts-ignore
          onPress={() => navigation.navigate('Daglig Medisinplan')}
        />
      </View>
      <View style={styles.button}>
        <Button
          color="rgba(0, 0, 0, 0)"
          title="Laste opp"
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
