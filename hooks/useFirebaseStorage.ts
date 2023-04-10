import {useEffect, useState} from 'react';
import database from '@react-native-firebase/database';

const useFirebaseStorage = (key: string) => {
  const [firebaseData, setFirebaseData] = useState([]);
  useEffect(() => {
    const downloadData = async () => {
      await database()
        .ref(key)
        .limitToFirst(10)
        .once('value')
        .then(snapshot => {
          let val = snapshot.val();
          setFirebaseData(val);
        });
    };
    downloadData().catch(e =>
      console.log(`Error loading firebase storage ${key}: ${e.message}`),
    );
  }, [key]);
  const addToFirebase = async (newData: any, callback: Function) => {
    await database()
      .ref(key)
      .push()
      .set(newData)
      .then(() => console.log(`${key} set.`))
      .then(() => {
        if (callback) callback();
      })
      .catch(e =>
        console.log(`Error uploading to firebase storage ${key}: ${e.message}`),
      );
  };

  return [firebaseData, addToFirebase] as const;
};

export default useFirebaseStorage;
