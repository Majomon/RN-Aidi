import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {SlidesStackParams} from '../../navigation/StackSlidesNavigator';
import {Button, Card, Input, Layout, Modal, Text} from '@ui-kitten/components';
import {useRegisterStore} from '../../store/useRegisterStore';

export const EmailScreen = () => {
  const navigation = useNavigation<StackNavigationProp<SlidesStackParams>>();
  const [email, setEmail] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const {register, token} = useRegisterStore(state => ({
    register: state.register,
    token: state.token,
  }));

  const handleEmailSubmit = async () => {
    try {
      await register(email);
      setModalMessage('Código enviado con éxito. Revisa tu email.');
      setIsError(false);
      setModalVisible(true);
    } catch (err: any) {
      setModalMessage(err.message);
      setIsError(true);
      setModalVisible(true);
    }
  };

  const handleModalDismiss = () => {
    setModalVisible(false);
    if (!isError) {
      if (token) {
        navigation.replace('VerificationEmailScreen', {token, email});
      } else {
        setModalMessage('El token no está disponible.');
        setIsError(true);
        setModalVisible(true);
      }
    }
  };

  return (
    <Layout style={{padding: 20}}>
      <Text style={{fontSize: 20, marginBottom: 20}}>Ingresa tu Email</Text>
      <Input
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          marginBottom: 20,
        }}
        placeholder="Tu email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Button onPress={handleEmailSubmit}>Enviar Código</Button>

      {/* Modal para mostrar mensajes */}
      <Modal
        visible={modalVisible}
        backdropStyle={styles.backdrop}
        onBackdropPress={handleModalDismiss}>
        <Card disabled={true}>
          <Text>{modalMessage}</Text>
          <Button onPress={handleModalDismiss}>
            {isError ? 'Cerrar' : 'Continuar'}
          </Button>
        </Card>
      </Modal>
    </Layout>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
