import {
  createStackNavigator,
  StackCardStyleInterpolator,
} from '@react-navigation/stack';
import {HomeScreen} from '../screens/home/HomeScreen';
import {OnboardingScreen} from '../screens/onboarding/OnboardingScreen';
import {ScanResultScreen} from '../screens/resultScan/ScanResultScreen';
import {ScanInfoScreen} from '../screens/scan/ScanInfoScreen';
import {CodeScanScreen} from '../screens/scan/CodeScanScreen';

export type RootStackParams = {
  OnboardingScreen: undefined;
  HomeScreen: undefined;
  ScanInfoScreen: undefined;
  CodeScanScreen: undefined;
  ScanResultScreen: { scannedData: string };
  //   ProductScreen: {productId: string};
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
        name="HomeScreen"
        component={HomeScreen}
        options={{cardStyleInterpolator: fadeAnimation}}
      />
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
    </Stack.Navigator>
  );
};
