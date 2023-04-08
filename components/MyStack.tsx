import {createStackNavigator} from '@react-navigation/stack';
import VibrationMeter from './VibrationMeter';
import PillEditor from './PillEditor';
import LinkPage from './LinkPage';
import CloudStorage from './CloudStorage';

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ParkinsonTracker™" component={LinkPage} />
      <Stack.Screen name="VibrationMeter" component={VibrationMeter} />
      <Stack.Screen name="PillEditor" component={PillEditor} />
      <Stack.Screen name="CloudStorage" component={CloudStorage} />
    </Stack.Navigator>
  );
};
export default MyStack;
