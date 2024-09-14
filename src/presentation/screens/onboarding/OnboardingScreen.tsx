import {CheckBox, Layout} from '@ui-kitten/components';
import React, {useState} from 'react';
import {Image, useWindowDimensions} from 'react-native';
import {colors} from '../../../config/colors';

export const OnboardingScreen = () => {
  const [checked, setChecked] = useState(false);
  const {width, height} = useWindowDimensions();
  // const handleFinish = async () => {
  //   try {
  //     // Guarda el estado de finalización en AsyncStorage
  //     await StorageAdapter.setItem('onboardingCompleted', 'true');

  //     // Navegar a HomeScreen y reemplazar la pantalla de OnboardingScreen
  //     navigation.reset({
  //       index: 0,
  //       routes: [{name: 'HomeScreen'}],
  //     });
  //   } catch (error) {
  //     console.error('Error al guardar el estado de finalización:', error);
  //   }
  // };

  return (
    <Layout
      style={{
        flex: 1,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {/*    <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      /> */}
      <Image
        source={require('../../assets/aidi_logo.png')}
        style={{
          width: width, // Ajustar el ancho de la imagen
          resizeMode: 'contain', // Ajustar la imagen para que mantenga su proporción
          backgroundColor: 'red',
        }}
      />
      <CheckBox
        checked={checked}
        onChange={nextChecked => setChecked(nextChecked)}>
        {`Acepto las condiciones de servicio: ${checked}`}
      </CheckBox>
    </Layout>
  );
};
