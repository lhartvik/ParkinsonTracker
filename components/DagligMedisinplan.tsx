import React, {useState} from 'react';
import {Button, StyleSheet, ScrollView} from 'react-native';
import LeggTilNyPlanlagtMedisin from './LeggTilNyPlanlagtMedisin';
import MedisinItem from './MedisinItem';
import {useAsyncStorage} from '../hooks/useAsyncStorage';
import {medisinplanStorageKey} from '../utils/constants';

export type PlanlagtMedisin = {
  id: string;
  medisin: string;
  styrke: string;
  planlagtKlokkeslett: string;
};

const DagligMedisinplan = () => {
  const [medisiner, setMedisiner] = useAsyncStorage(medisinplanStorageKey);
  const [visLeggTilNyMedisin, setVisLeggTilNyMedisin] = useState(false);
  const [alterMed, setAlterMed] = useState<PlanlagtMedisin>();
  const leggTilMedisin = (nyMedisin: PlanlagtMedisin) => {
    setMedisiner([...medisiner, nyMedisin]);
    setVisLeggTilNyMedisin(false);
    setAlterMed(undefined);
  };

  const alterMedisin = (medisinId: string) => {
    setVisLeggTilNyMedisin(true);
    setAlterMed(medisiner.find((m: PlanlagtMedisin) => m.id === medisinId));
    slettMedisin(medisinId);
  };

  const slettMedisin = (medisinId: string) => {
    setMedisiner(
      medisiner.filter((medisin: PlanlagtMedisin) => medisin.id !== medisinId),
    );
  };

  return (
    <ScrollView style={styles.container}>
      {medisiner
        .sort((a: PlanlagtMedisin, b: PlanlagtMedisin) =>
          a.planlagtKlokkeslett.localeCompare(b.planlagtKlokkeslett),
        )
        .map((medisin: PlanlagtMedisin) => (
          <MedisinItem
            key={medisin.id}
            medisinData={medisin}
            onAlter={alterMedisin}
            onDelete={slettMedisin}
          />
        ))}
      {!visLeggTilNyMedisin ? (
        <Button
          title="Legg til ny medisin"
          onPress={() => setVisLeggTilNyMedisin(true)}
        />
      ) : (
        <LeggTilNyPlanlagtMedisin
          leggTilMedisin={leggTilMedisin}
          altering={alterMed}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

export default DagligMedisinplan;
