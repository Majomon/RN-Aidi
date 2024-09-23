import {Layout, Text} from '@ui-kitten/components';
import React, {useEffect, useState} from 'react';
import {colors} from '../../../config/colors';
import {StorageAdapter} from '../../../config/adapters/storage-adapter';

export const HomeScreen = () => {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserName = async () => {
      const name = await StorageAdapter.getItem('nameUser');
      setUserName(name);
    };

    fetchUserName();
  }, []);

  return (
    <Layout style={{flex: 1}}>
      <Layout
        style={{
          padding: 10,
          backgroundColor: colors.primary,
        }}>
        <Text category="h1" style={{textAlign: 'center'}}>
          Datos
        </Text>
      </Layout>

      <Layout style={{marginHorizontal: 20, gap: 30}}>
        <Layout>
          <Text category="h5">Nombre:</Text>
          <Text>{userName ? `Hola ${userName}` : 'Cargando...'}</Text>
        </Layout>
        <Layout>
          <Text category="h5">Email:</Text>
          <Text>algo@algo.com</Text>
        </Layout>
        <Layout>
          <Text category="h5">Teléfono:</Text>
          <Text>1122334455</Text>
        </Layout>
      </Layout>
    </Layout>
  );
};
