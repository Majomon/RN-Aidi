import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen} from '../screens/home/HomeScreen';
import {InteraccionScreen} from '../screens/Interaccion/InteraccionScreen';
import {MyIcon} from '../components/ui/MyIcon';
import {colors} from '../../config/colors';

export type RootStackParamsBottom = {
  HomeScreen: undefined;
  InteraccionScreen: undefined;
  // ScanResultScreen: {dni: string; name: string};
};

const Tab = createBottomTabNavigator<RootStackParamsBottom>();

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text,
        tabBarIcon: ({color, focused}) => {
          let iconName: string = '';

          switch (route.name) {
            case 'HomeScreen':
              iconName = 'home-outline';
              break;

            case 'InteraccionScreen':
              iconName = 'collapse-outline';
              break;
          }
          return (
            <MyIcon
              name={iconName}
              color={focused ? colors.primary : colors.text}
              style={{
                transform: [{scale: focused ? 1.05 : 1}],
              }}
            />
          );
        },
      })}>
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
