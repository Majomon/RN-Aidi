import {StackScreenProps} from '@react-navigation/stack';
import {Button, Input, Layout, Text} from '@ui-kitten/components';
import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet} from 'react-native';
import {StorageAdapter} from '../../../config/adapters/storage-adapter';
import {RootStackParams} from '../../navigation/StackNavigator';
import {LoadingScreen} from '../loading/LoadingScreen';
import {colors} from '../../../config/colors';

interface FormData {
  dni: string;
  name: string;
  email: string;
  phone: string;
  cuil: string;
}

interface Props extends StackScreenProps<RootStackParams, 'ScanResultScreen'> {}

export const ScanResultScreen = ({route, navigation}: Props) => {
  const {dni, name} = route.params;
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    dni,
    name,
    email: '',
    phone: '',
    cuil: '',
  });

  const handleChange = (
    field: 'dni' | 'name' | 'email' | 'phone' | 'cuil',
    value: string,
  ) => {
    setFormData(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    const dniNumber = Number(formData.dni);
    const phoneNumber = Number(formData.phone);

    // Verificar si la conversión fue exitosa
    if (isNaN(dniNumber) || isNaN(phoneNumber)) {
      Alert.alert('Error', 'DNI o teléfono no son válidos');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        // 'https://aidi-back.vercel.app/api/users/register',
        'http://192.168.0.6:3003/api/users/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        },
      );

      const result = await response.json();

      if (response.ok) {
        await StorageAdapter.setItem('onboardingCompleted', 'true');
        await StorageAdapter.setItem('nameUser', formData.name);
        await StorageAdapter.setItem('dniUser', formData.dni);

        setTimeout(() => {
          setLoading(false);
          navigation.reset({
            index: 0,
            routes: [{name: 'BottomTabNavigator'}],
          });
        }, 1000);
      } else {
        setLoading(false);
        Alert.alert('Error', result.message || 'Error al guardar los datos');
      }
    } catch (error) {
      Alert.alert('Error', 'Error de red o servidor');
    }
  };

  useEffect(() => {
    const {dni, name, email, phone} = formData;
    if (dni && name && email && phone) {
      setIsFormComplete(true);
    } else {
      setIsFormComplete(false);
    }
  }, [formData]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Layout style={styles.container}>
      <Layout style={styles.containerInfo}>
        <Text category="h4">Completa tu perfil</Text>
        <Layout>
          <Text category="s1" style={styles.textInput}>
            Nombre y apellido:
          </Text>
          <Input
            placeholder="Nombre"
            value={formData.name}
            onChangeText={text => handleChange('name', text)}
            style={styles.input}
          />
        </Layout>
        <Layout>
          <Text category="s1" style={styles.textInput}>
            Dni:
          </Text>
          <Input
            placeholder="Dni"
            value={formData.dni}
            onChangeText={text => handleChange('dni', text)}
            keyboardType="numeric"
            maxLength={8}
            style={styles.input}
          />
        </Layout>

        <Layout>
          <Text category="s1" style={styles.textInput}>
            Cuil:
          </Text>
          <Input
            placeholder="Cuil"
            value={formData.cuil}
            onChangeText={text => handleChange('cuil', text)}
            keyboardType="numeric"
            maxLength={12}
            style={styles.input}
          />
        </Layout>

        <Layout>
          <Text category="s1" style={styles.textInput}>
            Email:
          </Text>
          <Input
            placeholder="Email"
            value={formData.email}
            onChangeText={text => handleChange('email', text)}
            keyboardType="email-address"
            style={styles.input}
          />
        </Layout>

        <Layout>
          <Text category="s1" style={styles.textInput}>
            Teléfono:
          </Text>
          <Input
            placeholder="Teléfono"
            value={formData.phone}
            onChangeText={text => handleChange('phone', text)}
            // keyboardType="phone-pad" // Aca seria asi si en la bdd acepta string en lugar de numero
            keyboardType="numeric"
            maxLength={8}
            style={styles.input}
          />
        </Layout>
      </Layout>
      <Button
        status="primary"
        onPress={handleSubmit}
        disabled={!isFormComplete}
        style={[
          styles.button,
          {backgroundColor: isFormComplete ? colors.primary : colors.disabled},
        ]}>
        {isFormComplete ? 'Guardar' : 'Completa los campos'}
      </Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  containerInfo: {
    gap: 20,
  },
  textInput: {
    marginBottom: 4,
    width: '100%',
  },
  input: {
    marginBottom: 2,
    width: '100%',
  },
  button: {
    marginTop: 40,
  },
});
