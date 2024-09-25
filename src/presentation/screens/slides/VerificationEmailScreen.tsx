import React, {useState} from 'react';
import {View, Text, TextInput, Button, Alert} from 'react-native';
import axios from 'axios';
import {StackScreenProps} from '@react-navigation/stack';
import {SlidesStackParams} from '../../navigation/StackSlidesNavigator';

interface Props
  extends StackScreenProps<SlidesStackParams, 'VerificationEmailScreen'> {}

export const VerificationEmailScreen = ({navigation, route}: Props) => {
  const {token, email} = route.params;
  
  const [verificationCode, setVerificationCode] = useState('');

  const handleCodeSubmit = async () => {
    /*     try {
      // Realiza la petición para verificar el código
      const response = await axios.post('YOUR_VERIFICATION_ENDPOINT', {
        token,
        code: verificationCode,
      });

      // Si la verificación es exitosa, navega a TakePhotoScreen
      if (response.status === 200) {
        navigation.replace('TakePhotoScreen'); // Reemplaza la pantalla actual
      }
    } catch (err) {
      Alert.alert(
        'Error',
        'El código ingresado es incorrecto. Inténtalo de nuevo.',
      );
    } */
  };

  return (
    <View style={{padding: 20}}>
      <Text style={{fontSize: 20, marginBottom: 20}}>
        Ingresa el código enviado a {email}
      </Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          marginBottom: 20,
        }}
        placeholder="Código de verificación"
        value={verificationCode}
        onChangeText={setVerificationCode}
        keyboardType="numeric"
      />
      <Button title="Verificar Código" onPress={handleCodeSubmit} />
    </View>
  );
};
