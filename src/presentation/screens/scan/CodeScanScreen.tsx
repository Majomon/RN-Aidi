import React, {useState} from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../../navigation/StackNavigator';
import {StackNavigationProp} from '@react-navigation/stack';

export const CodeScanScreen = () => {
  const [data, setData] = useState<string | null>(null);
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  const validateData = (data: string): boolean => {
    return data.includes('@');
  };

  const formatData = (data: string): string => {
    // Eliminar caracteres no deseados
    return data.replace(/[^\w\s@]/g, '').trim();
  };

  const handleQRCodeRead = ({data}: {data: string}) => {
    const formattedData = formatData(data);

    if (validateData(formattedData)) {
      setData(formattedData);
      navigation.navigate('ScanResultScreen', {scannedData: formattedData});
    } else {
      Alert.alert(
        'Error',
        'El código escaneado no es válido. Por favor, inténtalo de nuevo.',
      );
    }
  };

  
  return (
    <QRCodeScanner
      onRead={handleQRCodeRead}
      reactivate={true}
      reactivateTimeout={500}
      topContent={
        <View>
          <Text style={styles.centerText}>{data || 'Escanea un código'}</Text>
        </View>
      }
      showMarker
      bottomContent={
        <View>
          <Text style={styles.centerText}>QR Code Scanner</Text>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  centerText: {
    fontSize: 18,
    padding: 20,
    margin: 10,
    color: 'black',
    backgroundColor: 'grey',
    borderRadius: 20,
  },
});

