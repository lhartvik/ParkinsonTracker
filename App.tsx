import {NavigationContainer} from '@react-navigation/native';
import VibrationMeter from './components/VibrationMeter';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={'Home'}>
        <Stack.Screen name={'Home'} component={VibrationMeter} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
