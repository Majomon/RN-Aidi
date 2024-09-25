import {createStackNavigator} from '@react-navigation/stack';
import {EmailScreen} from '../screens/slides/EmailScreen';
import {SlidesScreen} from '../screens/slides/SlidesScreen';
import {VerificationEmailScreen} from '../screens/slides/VerificationEmailScreen';

export type SlidesStackParams = {
  SlidesScreen: undefined;
  EmailScreen: undefined;
  VerificationEmailScreen: {token: string; email: string};
};

const SlidesStack = createStackNavigator<SlidesStackParams>();

export const SlidesStackNavigator = () => {
  return (
    <SlidesStack.Navigator>
      <SlidesStack.Screen
        name="SlidesScreen"
        component={SlidesScreen}
        options={{headerShown: false}}
      />
      <SlidesStack.Screen
        name="EmailScreen"
        component={EmailScreen}
        options={{headerShown: false}}
      />
      <SlidesStack.Screen
        name="VerificationEmailScreen"
        component={VerificationEmailScreen}
        options={{headerShown: false}}
      />
    </SlidesStack.Navigator>
  );
};
