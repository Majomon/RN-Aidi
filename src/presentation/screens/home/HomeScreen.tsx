import {Layout, Text} from '@ui-kitten/components';
import React, {useEffect, useState} from 'react';
import {Alert, Image} from 'react-native';
import {colors} from '../../../config/colors';
import {StorageAdapter} from '../../../config/adapters/storage-adapter';
import {LoadingScreen} from '../loading/LoadingScreen';

interface UserData {
  email: string;
  phone: string;
}

export const HomeScreen = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const name = await StorageAdapter.getItem('nameUser');
      const dni = await StorageAdapter.getItem('dniUser');
      const avatar = await StorageAdapter.getItem('userAvatar');

      if (!dni) {
        Alert.alert('Error', 'No se encontró el DNI del usuario');
        setLoading(false);
        return;
      }

      setUserName(name);
      setUserAvatar(avatar);

      try {
        const response = await fetch(
          'http://192.168.0.6:3003/api/users/login',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({dni}),
          },
        );

        const result = await response.json();

        if (response.ok) {
          setUserData({
            email: result.user.email,
            phone: result.user.phone,
          });

          await StorageAdapter.setItem('tokenLogin', result.token);
          console.log('Token guardado:', result.token);
        } else {
          Alert.alert(
            'Error',
            result.message || 'Error al obtener los datos del usuario',
          );
        }
      } catch (error) {
        Alert.alert('Error', 'Error de red o servidor');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();

    const getToken = async () => {
      const token = await StorageAdapter.getItem('tokenLogin');
      console.log('Token recuperado:', token);
    };

    getToken();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Layout style={{flex: 1, backgroundColor: colors.background}}>
      <Layout
        style={{
          padding: 10,
          backgroundColor: colors.primary,
        }}>
        <Image
          source={{
            uri: userAvatar || 'https://i.pravatar.cc/300',
          }}
          style={{width: 100, height: 100, borderRadius: 50}}
        />
      </Layout>

      <Layout
        style={{
          marginHorizontal: 20,
          gap: 30,
          backgroundColor: colors.background,
        }}>
        <Layout style={{backgroundColor: colors.background}}>
          <Text category="h5">Nombre:</Text>
          <Text>{userName ? `Hola ${userName}` : 'Cargando...'}</Text>
        </Layout>
        <Layout style={{backgroundColor: colors.background}}>
          <Text category="h5">Email:</Text>
          <Text>{userData?.email || 'Cargando...'}</Text>
        </Layout>
        <Layout style={{backgroundColor: colors.background}}>
          <Text category="h5">Teléfono:</Text>
          <Text>{userData?.phone || 'Cargando...'}</Text>
        </Layout>
      </Layout>
    </Layout>
  );
};
