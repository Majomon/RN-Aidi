import {createStackNavigator} from '@react-navigation/stack';
import {InteractionDetailScreen} from '../screens/interactions/InteractionDetailScreen';
import {InteractionScreen} from '../screens/interactions/InteractionScreen';

export type SlidesStackParams = {
  InteractionScreen: undefined;
  InteractionDetailScreen: {idInteraction: string};
};

const Interactions = createStackNavigator<SlidesStackParams>();

export const StackInteractions = () => {
  return (
    <Interactions.Navigator>
      <Interactions.Screen
        name="InteractionScreen"
        component={InteractionScreen}
        options={{headerShown: false}}
      />
      <Interactions.Screen
        name="InteractionDetailScreen"
        component={InteractionDetailScreen}
        options={{headerShown: false}}
      />
    </Interactions.Navigator>
  );
};
