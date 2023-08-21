import {useEffect, useState} from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import {PlanlagtMedisin} from './DagligMedisinplan';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {medisinStorageKey} from '../utils/constants';

type LeggTilNyPlanlagtMedisinProps = {
  leggTilMedisin: (nyMedisin: PlanlagtMedisin) => void;
  altering?: PlanlagtMedisin;
};
const LeggTilNyPlanlagtMedisin = ({
  leggTilMedisin,
  altering,
}: LeggTilNyPlanlagtMedisinProps) => {
  const [medisin, setMedisin] = useState('');
  const [styrke, setStyrke] = useState('');
  const [planlagtKlokkeslett, setPlanlagtKlokkeslett] = useState('');

  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem(medisinStorageKey).then(s =>
        s ? JSON.parse(s) : undefined,
      );
      if (altering) setMedisin(altering.medisin);
      else if (stored?.navn) setMedisin(stored.navn);
      if (altering) setStyrke(altering.styrke);
      else if (stored?.Styrke) setStyrke(stored.Styrke);
      if (altering) setPlanlagtKlokkeslett(altering.planlagtKlokkeslett);
    })();
  }, [altering]);

  const lagreStandardMedisin = async () => {
    try {
      const settings = {
        navn: medisin,
        Styrke: styrke,
      };
      await AsyncStorage.setItem(medisinStorageKey, JSON.stringify(settings));
    } catch (error) {
      console.error('Feil ved lagring av standard medisin:', error);
    }
  };
  const handleLeggTilMedisin = () => {
    const nyMedisin = {
      id: Date.now().toString(),
      medisin,
      styrke,
      planlagtKlokkeslett,
    };

    leggTilMedisin(nyMedisin);
    setPlanlagtKlokkeslett('');
  };

  return (
    <View>
      <Text>Legemiddel:</Text>
      <TextInput
        value={medisin}
        onChangeText={setMedisin}
        placeholder={medisin ?? 'Legemiddel'}
      />

      <Text>Styrke (mg):</Text>
      <TextInput
        value={styrke}
        onChangeText={setStyrke}
        placeholder={styrke ?? 'Styrke'}
      />

      <Text>Planlagt klokkeslett:</Text>
      <TextInput
        value={planlagtKlokkeslett}
        onChangeText={setPlanlagtKlokkeslett}
        placeholder={planlagtKlokkeslett ?? 'Klokkeslett'}
      />

      <Button
        title={altering ? 'Lagre' : 'Legg til'}
        onPress={handleLeggTilMedisin}
      />
      <Button title={'Lagre som standard'} onPress={lagreStandardMedisin} />
    </View>
  );
};
export default LeggTilNyPlanlagtMedisin;
