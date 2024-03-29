import {createStackNavigator} from '@react-navigation/stack';
import HvorRystende from './HvorRystende';
import PillEditor from './PillEditor';
import LinkPage from './LinkPage';
import CloudStorage from './CloudStorage';
import DagligMedisinplan from './DagligMedisinplan';

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Skjelvemåler™" component={LinkPage} />
      <Stack.Screen name="Hvor rystende" component={HvorRystende} />
      <Stack.Screen name="Redigere Pilletider" component={PillEditor} />
      <Stack.Screen name="CloudStorage" component={CloudStorage} />
      <Stack.Screen name="Daglig Medisinplan" component={DagligMedisinplan} />
    </Stack.Navigator>
  );
};
export default MyStack;
