import {Button, Layout, Text} from '@ui-kitten/components';
import React from 'react';
import {Image} from 'react-native';
import {colors} from '../../../config/colors';
import {RootStackParams} from '../../navigation/StackNavigator';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

export const ScanInfoScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  return (
    <Layout
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 100,
      }}>
      <Layout>
        <Text category="h3">Escanea el codigo de barras de tu DNI</Text>
        <Image
          source={require('../../assets/dni_muestra.png')}
          style={{
            width: 300,
            height: 200,
            padding: 20,
            marginTop: 20,
            backgroundColor: colors.background,
            borderRadius: 20,
            resizeMode: 'contain',
          }}
        />
        <Image
          source={require('../../assets/flecha_vector.png')}
          style={{
            width: 50,
            height: 50,
            position: 'absolute',
            bottom: -25,
            right: 90,
            resizeMode: 'contain',
            transform: [{rotate: '45deg'}],
          }}
        />
      </Layout>
      <Layout
        style={{
          width: 300,
          alignItems: 'flex-end',
          marginTop: 200,
        }}>
        <Button
          style={{width: 150}}
          onPress={() => navigation.navigate('CodeScanScreen')}>
          Siguiente
        </Button>
      </Layout>
    </Layout>
  );
};
