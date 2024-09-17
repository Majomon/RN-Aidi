import {
  createStackNavigator,
  StackCardStyleInterpolator,
} from '@react-navigation/stack';
import {OnboardingScreen} from '../screens/onboarding/OnboardingScreen';
import {ProfileScreen} from '../screens/profile/ProfileScreen';
import {ScanResultScreen} from '../screens/resultScan/ScanResultScreen';
import {CodeScanScreen} from '../screens/scan/CodeScanScreen';
import {ScanInfoScreen} from '../screens/scan/ScanInfoScreen';
import {BottomTabNavigator} from './BottomTabNavigator';

export type RootStackParams = {
  OnboardingScreen: undefined;
  ScanInfoScreen: undefined;
  CodeScanScreen: undefined;
  ScanResultScreen: {dni: string; name: string};
  BottomTabNavigator: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

const fadeAnimation: StackCardStyleInterpolator = ({current}) => {
  return {
    cardStyle: {
      opacity: current.progress,
    },
  };
};

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="OnboardingScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="OnboardingScreen"
        component={OnboardingScreen}
        options={{cardStyleInterpolator: fadeAnimation}}
      />
      <Stack.Screen
        name="ScanInfoScreen"
        component={ScanInfoScreen}
        options={{cardStyleInterpolator: fadeAnimation}}
      />
      <Stack.Screen
        name="CodeScanScreen"
        component={CodeScanScreen}
        options={{cardStyleInterpolator: fadeAnimation}}
      />
      <Stack.Screen
        name="ScanResultScreen"
        component={ScanResultScreen}
        options={{cardStyleInterpolator: fadeAnimation}}
      />
      <Stack.Screen
        name="BottomTabNavigator" 
        component={BottomTabNavigator}
        options={{cardStyleInterpolator: fadeAnimation}}
      />
    </Stack.Navigator>
  );
};
