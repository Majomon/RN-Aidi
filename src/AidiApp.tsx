import 'react-native-gesture-handler';

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Text} from 'react-native';
import { StackNavigator } from './presentation/navigation/StackNavigator';

export const AidiApp = () => {
  return (
    <NavigationContainer>
      <StackNavigator/>
    </NavigationContainer>
  );
};
