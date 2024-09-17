import {StackScreenProps} from '@react-navigation/stack';
import React, {useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {RootStackParams} from '../../navigation/StackNavigator';
import {Button, Input} from '@ui-kitten/components';

interface Props extends StackScreenProps<RootStackParams, 'ScanResultScreen'> {}

export const ScanResultScreen = ({route, navigation}: Props) => {
  const {scannedData} = route.params;
  const [formData, setFormData] = useState(scannedData.split('@'));

  const handleChange = (index: number, value: string) => {
    const updatedData = [...formData];
    updatedData[index] = value;
    setFormData(updatedData);
  };

  const handleSubmit = () => {
    // Aquí podrías validar y enviar los datos o guardarlos en el estado
    const formattedData = formData.join('@'); // Reconstruye la cadena de datos
    // Aquí podrías enviar los datos a un servidor o guardarlos en el estado
    Alert.alert(
      'Datos Guardados',
      `Los datos se han guardado: ${formattedData}`,
    );
    // Navegar a la siguiente pantalla o realizar otra acción
  };

  return (
    <View style={styles.container}>
      {formData.map((data, index) => (
        <Input
          key={index}
          placeholder={`Campo ${index + 1}`}
          value={data}
          onChangeText={text => handleChange(index, text)}
          style={styles.input}
        />
      ))}
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
