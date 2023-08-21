import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {PlanlagtMedisin} from './DagligMedisinplan';

type MedisinItemProps = {
  medisinData: PlanlagtMedisin;
  onAlter: (id: string) => {};
  onDelete: (id: string) => {};
};
const MedisinItem = ({medisinData, onAlter, onDelete}: MedisinItemProps) => {
  return (
    <View style={styles.container}>
      <Text>{medisinData.medisin}</Text>
      <Text>Styrke: {medisinData.styrke} mg</Text>
      <Text>Planlagt klokkeslett: {medisinData.planlagtKlokkeslett}</Text>
      <TouchableOpacity
        onPress={() => onAlter(medisinData.id)}
        style={styles.deleteButton}>
        <Text>Endre</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onDelete(medisinData.id)}
        style={styles.deleteButton}>
        <Text>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 5,
    alignSelf: 'flex-end',
    marginTop: 5,
  },
});

export default MedisinItem;
