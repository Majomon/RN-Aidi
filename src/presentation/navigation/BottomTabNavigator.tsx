import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen} from '../screens/home/HomeScreen';
import {InteraccionScreen} from '../screens/Interaccion/InteraccionScreen';

export type RootStackParamsBottom = {
  HomeScreen: undefined;
  InteraccionScreen: undefined;
  // ScanResultScreen: {dni: string; name: string};
};

const Tab = createBottomTabNavigator<RootStackParamsBottom>();

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{title: 'Mis datos'}}
      />
      <Tab.Screen
        name="InteraccionScreen"
        component={InteraccionScreen}
        options={{title: 'Mis intereacciones'}}
      />
    </Tab.Navigator>
  );
};
