import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {StorageAdapter} from '../../../config/adapters/storage-adapter';

export const HomeScreen = () => {
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      const completed = await StorageAdapter.getItem('onboardingCompleted');
      setOnboardingCompleted(completed === 'true');
    };

    checkOnboardingStatus();
  }, [onboardingCompleted]);

  console.log(onboardingCompleted);
  
  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  );
};
