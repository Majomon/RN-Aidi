import React, {useState} from 'react';
import {StyleSheet, Alert} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../../navigation/StackNavigator';
import {StackNavigationProp} from '@react-navigation/stack';
import {Layout, Text} from '@ui-kitten/components';
import {colors} from '../../../config/colors';

export const CodeScanScreen = () => {
  const [data, setData] = useState<string | null>(null);
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  const formatData = (data: string): {dni: string; name: string} | null => {
    const parts = data.split('@');
    console.log(parts);

    if (parts.length >= 3) {
      return {
        dni: parts[4],
        name: `${parts[1]} ${parts[2]}`,
      };
    }
    return null;
  };

  const handleQRCodeRead = ({data}: {data: string}) => {
    const formattedData = formatData(data);

    if (formattedData) {
      setData(data);
      navigation.navigate('ScanResultScreen', {
        dni: formattedData.dni,
        name: formattedData.name,
      });
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
      cameraStyle={styles.cameraStyle}
      containerStyle={{
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      markerStyle={{
        height: 100,
        borderColor: colors.primary,
      }}
      topContent={
        <Layout style={styles.container}>
          <Text style={styles.centerText}>
            {data || 'Escanea el código de barras de tu Dni'}
          </Text>
        </Layout>
      }
      showMarker
      bottomContent={
        <Layout style={styles.containerBottom}>
          <Text
            style={{
              textAlign: 'center',
              padding: 10,
              fontSize: 16,
              fontWeight: 'bold',
              color: 'white',
              backgroundColor: 'black',
            }}>
            Posicionalo bien en el centro
          </Text>
        </Layout>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerText: {
    textAlign: 'center',
    fontSize: 30,
    padding: 20,
    marginBottom: 50,
  },
  cameraStyle: {
    width: 320,
    height: 250,
    borderRadius: 5,
    overflow: 'hidden',
  },
  containerBottom: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'red',
  },
});
