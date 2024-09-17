import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen} from '../screens/home/HomeScreen';
import {ProfileScreen} from '../screens/profile/ProfileScreen';

export type RootStackParams = {
  HomeScreen: undefined;
  ProfileScreen: undefined;
  // ScanResultScreen: {dni: string; name: string};
};

const Tab = createBottomTabNavigator<RootStackParams>();

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
    </Tab.Navigator>
  );
};
