import messaging from '@react-native-firebase/messaging';

export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  return enabled;
};

export const getFCMToken = async (): Promise<string | null> => {
  try {
    const token = await messaging().getToken();
    return token;
  } catch (error) {
    console.error('Erro ao buscar token FCM:', error);
    return null;
  }
};

export const listenToForegroundMessages = (onMessageReceived: (message: any) => void) => {
  return messaging().onMessage(async remoteMessage => {
    onMessageReceived(remoteMessage);
  });
};

export const subscribeToTopic = async (topic: string) => {
  await messaging().subscribeToTopic(topic);
};

export const unsubscribeFromTopic = async (topic: string) => {
  await messaging().unsubscribeFromTopic(topic);
};
