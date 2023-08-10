import {Button, Text, TextInput, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState} from 'react';
import { medisinStorageKey } from "../utils/constants";

const Innstillinger = () => {
  const [medisin, setMedisin] = useState('');
  const [styrke, setStyrke] = useState('');

  const saveSettings = async () => {
    try {
      const settings = {
        navn: medisin,
        Styrke: styrke,
      };
      await AsyncStorage.setItem(medisinStorageKey, JSON.stringify(settings));
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  return (
    <View>
      <Text>Legemiddel:</Text>
      <TextInput
        value={medisin}
        onChangeText={setMedisin}
        placeholder="Legemiddel navn"
      />

      <Text>Styrke (mg):</Text>
      <TextInput value={styrke} onChangeText={setStyrke} placeholder="Styrke" />

      <Button title="Lagre innstillinger" onPress={saveSettings} />
    </View>
  );
};
export default Innstillinger;
