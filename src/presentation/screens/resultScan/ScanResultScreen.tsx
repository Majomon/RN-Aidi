import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {Text, View} from 'react-native';
import {RootStackParams} from '../../navigation/StackNavigator';

interface Props extends StackScreenProps<RootStackParams, 'ScanResultScreen'> {}

export const ScanResultScreen = ({route}:Props) => {
  const info = route.params.scannedData
console.log(info);

  
  return (
    <View>
      <Text>ScanResultScreen</Text>
    </View>
  );
};
