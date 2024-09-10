import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../screens/home/HomeScreen';
import {OnboardingScreen} from '../screens/onboarding/OnboardingScreen';

export type RootStackParams = {
  OnboardingScreen: undefined;
  HomeScreen: undefined;
  //   ProductScreen: {productId: string};
};

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
    </Stack.Navigator>
  );
};
