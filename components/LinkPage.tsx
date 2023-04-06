import {Button, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const LinkPage = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Welcome to my app!</Text>
      <Button
        title="Logg Parkinsonstuff"
        // @ts-ignore
        onPress={() => navigation.navigate('VibrationMeter')}
      />
      <Button
        title="PillEditor"
        // @ts-ignore
        onPress={() => navigation.navigate('PillEditor')}
      />
    </View>
  );
};
export default LinkPage;
