import {Button, ScrollView, Text, View} from 'react-native';
import {pillStorageKey, shakeStorageKey} from '../utils/constants';
import {PillData, Shakedata} from '../utils/types';
import useFirebaseStorage from '../hooks/useFirebaseStorage';
import {useAsyncStorage} from '../hooks/useAsyncStorage';
import Knapperad from '../UI/Knapperad';

const CloudStorage = () => {
  const [localPill, _saveLocalPill, clearLocalPill] =
    useAsyncStorage(pillStorageKey);
  const [localShake, _saveLocalShake, clearLocalShake] =
    useAsyncStorage(shakeStorageKey);
  const [_fbShakeData, addShakeDataToFb] = useFirebaseStorage(shakeStorageKey);
  const [_fbPillData, addPillDataToFb] = useFirebaseStorage(pillStorageKey);

  const handleUpload = async () => {
    await addShakeDataToFb(localShake, clearLocalShake);
    await addPillDataToFb(localPill, clearLocalPill);
  };

  return (
    <ScrollView>
      <View>
        <Text key={1}>Overfør data til skyen</Text>
        {localShake &&
          localShake.map((d: Shakedata) => (
            <Text key={d.timestamp}>ShakeData: {d.timestamp}</Text>
          ))}
        {localPill &&
          localPill.map((d: PillData) => (
            <Text key={d.timestamp}>Pilldata: {d.timestamp}</Text>
          ))}
        <Knapperad>
          <Button title={'Last opp'} onPress={handleUpload} />
        </Knapperad>
      </View>
    </ScrollView>
  );
};
export default CloudStorage;
