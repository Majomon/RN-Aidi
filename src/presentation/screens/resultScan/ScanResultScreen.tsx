import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import {Input, Button} from '@ui-kitten/components';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigation/StackNavigator';
import {LoadingScreen} from '../loading/LoadingScreen';

interface FormData {
  dni: string;
  name: string;
  email: string;
  phone: string;
  cuil: number;
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
    cuil: 12312153,
  });

  const handleChange = (
    field: 'dni' | 'name' | 'email' | 'phone',
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
        setTimeout(() => {
          setLoading(false);
          navigation.reset({
            index: 0,
            routes: [{name: 'ProfileScreen'}],
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
    <View style={styles.container}>
      <Input
        placeholder="DNI"
        value={formData.dni}
        onChangeText={text => handleChange('dni', text)}
        keyboardType="numeric"
        maxLength={8}
        style={styles.input}
      />
      <Input
        placeholder="Nombre"
        value={formData.name}
        onChangeText={text => handleChange('name', text)}
        style={styles.input}
      />
      <Input
        placeholder="Email"
        value={formData.email}
        onChangeText={text => handleChange('email', text)}
        keyboardType="email-address"
        style={styles.input}
      />
      <Input
        placeholder="Teléfono"
        value={formData.phone}
        onChangeText={text => handleChange('phone', text)}
        // keyboardType="phone-pad" // Aca seria asi si en la bdd acepta string en lugar de numero
        keyboardType="numeric"
        maxLength={8}
        style={styles.input}
      />
      <Button
        status="primary"
        onPress={handleSubmit}
        disabled={!isFormComplete}>
        Guardar
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    marginBottom: 10,
    width: '100%',
  },
});
