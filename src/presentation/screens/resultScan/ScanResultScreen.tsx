import React, {useState} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import {Input, Button} from '@ui-kitten/components';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigation/StackNavigator';

interface Props extends StackScreenProps<RootStackParams, 'ScanResultScreen'> {}

export const ScanResultScreen = ({route}: Props) => {
  const {dni, name} = route.params;
  const [formData, setFormData] = useState<{
    dni: string;
    name: string;
    email: string;
    phone: string;
  }>({
    dni,
    name,
    email: '',
    phone: '',
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

  const handleSubmit = () => {
    const dniNumber = Number(formData.dni);
    const phoneNumber = Number(formData.phone);

    // Verificar si la conversión fue exitosa
    if (isNaN(dniNumber) || isNaN(phoneNumber)) {
      Alert.alert('Error', 'DNI o teléfono no son válidos');
      return;
    }

    Alert.alert(
      'Datos Guardados',
      `Datos guardados:\nDNI: ${formData.dni}\nNombre: ${formData.name}\nEmail: ${formData.email}\nTeléfono: ${formData.phone}`,
    );
  };

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
      <Button status="primary" onPress={handleSubmit}>
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
