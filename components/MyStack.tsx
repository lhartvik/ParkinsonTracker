import {createStackNavigator} from '@react-navigation/stack';
import HvorRystende from './HvorRystende';
import PillEditor from './PillEditor';
import LinkPage from './LinkPage';
import CloudStorage from './CloudStorage';
import Innstillinger from "./Innstillinger";

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Skjelvemåler™" component={LinkPage} />
      <Stack.Screen name="Hvor rystende" component={HvorRystende} />
      <Stack.Screen name="Redigere Pilletider" component={PillEditor} />
      <Stack.Screen name="CloudStorage" component={CloudStorage} />
      <Stack.Screen name="Innstillinger" component={Innstillinger} />
    </Stack.Navigator>
  );
};
export default MyStack;
