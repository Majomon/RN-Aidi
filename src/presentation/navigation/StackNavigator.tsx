import {
  createStackNavigator,
  StackCardStyleInterpolator
} from '@react-navigation/stack';
import { useEffect, useState } from 'react';
import { StorageAdapter } from '../../config/adapters/storage-adapter';
import { LoadingScreen } from '../screens/loading/LoadingScreen';
import { OnboardingScreen } from '../screens/onboarding/OnboardingScreen';
import { ScanResultScreen } from '../screens/resultScan/ScanResultScreen';
import { CodeScanScreen } from '../screens/scan/CodeScanScreen';
import { ScanInfoScreen } from '../screens/scan/ScanInfoScreen';
import { BottomTabNavigator } from './BottomTabNavigator';

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
  const [initialRoute, setInitialRoute] = useState<
    keyof RootStackParams | undefined
  >(undefined);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const hasCompletedOnboarding = await StorageAdapter.getItem(
          'onboardingCompleted',
        );

        if (hasCompletedOnboarding == 'true') {
          setInitialRoute('BottomTabNavigator');
        } else {
          setInitialRoute('OnboardingScreen');
        }
      } catch (error) {
        console.log('Error checking local storage', error);
        setInitialRoute('OnboardingScreen');
      }
    };

    checkOnboardingStatus();
  }, []);

  if (!initialRoute) {
    return <LoadingScreen />;
  }
  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
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
