import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { IconButton, Menu, Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import EStyleSheet from 'react-native-extended-stylesheet';
import { auth } from '../config/firebaseConfig';
import { RootStackParamList } from '../navigation/MainNavigator';

type AppHeaderProps = {
  appName: string;
  appIcon?: string;
};

export default function AppHeader({ appName, appIcon = 'storefront' }: AppHeaderProps) {
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const handleLogout = async () => {
    closeMenu();
    await auth.signOut();
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <MaterialIcons name={appIcon} size={36} color="#6200ee" />
        <Text style={styles.appName}>{appName}</Text>
      </View>

      <Menu
        visible={menuVisible}
        onDismiss={closeMenu}
        anchor={
          <IconButton
            icon={() => <Avatar.Text size={30} label="U" />}
            onPress={openMenu}
          />
        }
      >
        <Menu.Item onPress={handleLogout} title="Sair" />
      </Menu>
    </View>
  );
}

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: '$spacingMd',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appName: {
    marginLeft: '$spacingSm',
    fontSize: 18,
    fontWeight: 'bold',
    color: '$primary',
  },
});
