import messaging from '@react-native-firebase/messaging';
import {Linking, PermissionsAndroid, Platform} from 'react-native';
import {navigationRef} from '../navigation/navigationRef';

const usePushNotification = () => {
  const requestUserPermission = async () => {
    if (Platform.OS === 'ios') {
      //Request iOS permission
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
    } else if (Platform.OS === 'android') {
      const res = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
    }
  };

  // Para obtener el Token
  const getFCMToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log('Your Firebase Token is:', fcmToken);
    } else {
      console.log('Failed', 'No token received');
    }
  };

  // Cuandos se recibe el msj en primer plano
  const listenToForegroundNotifications = async () => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log(
        'Llego un nuevo msj. La app esta en PRIMER PLANO!',
        JSON.stringify(remoteMessage),
      );

      // Redirigir al usuario solo cuando llega una notificación en primer plano
      Linking.openURL('https://www.google.com').catch(err =>
        console.error('An error occurred', err),
      );
    });

    return unsubscribe;
  };

  // Cuandos se recibe el msj en segundo plano o cerrada
  const listenToBackgroundNotifications = async () => {
    const unsubscribe = messaging().setBackgroundMessageHandler(
      async remoteMessage => {
        console.log(
          'Llego un nuevo msj. La app esta en SEGUNDO PLANO o CERRADA!',
          JSON.stringify(remoteMessage),
        );
      },
    );
    return unsubscribe;
  };

  // Cuando la app esta en segundo plano
  const onNotificationOpenedAppFromBackground = async () => {
    const unsubscribe = messaging().onNotificationOpenedApp(
      async remoteMessage => {
        console.log(
          'La app esta en segundo plano, se procede a la navegacion:',
          JSON.stringify(remoteMessage),
        );

        // Cuando recibe la notificacion redirige
        if (navigationRef.isReady()) {
          navigationRef.navigate('ScanInfoScreen');
        }
      },
    );
    return unsubscribe;
  };

  // Cuando la app esta cerrada
  const onNotificationOpenedAppFromQuit = async () => {
    const message = await messaging().getInitialNotification();

    if (message) {
      console.log(
        'Se abrió la aplicación desde la notificación',
        JSON.stringify(message),
      );

      // Espera a que navigationRef esté listo antes de navegar
      if (navigationRef.isReady()) {
        navigationRef.navigate('BottomTabNavigator');
      } else {
        console.log('No se pudo realizar la navegación.');
      }
    }
  };

  return {
    requestUserPermission,
    getFCMToken,
    listenToForegroundNotifications,
    listenToBackgroundNotifications,
    onNotificationOpenedAppFromBackground,
    onNotificationOpenedAppFromQuit,
  };
};

export default usePushNotification;
