import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { IconButton, Menu, Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import EStyleSheet from 'react-native-extended-stylesheet';
import { RootStackParamList } from '../navigation/MainNavigator';
import { useAuth } from "../contexts/AuthContext";


type AppHeaderProps = {
  appName: string;
  appIcon?: string;
  showMenu?: boolean;
};

export default function AppHeader({ appName, appIcon = 'storefront', showMenu = true }: AppHeaderProps) {
  const { logOut } = useAuth();
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const handleLogout = async () => {
    closeMenu();
    await logOut();
  };

  return (
    <View
      style={[
        styles.container,
        !showMenu && { justifyContent: 'center' } 
      ]}
    >
      <View style={styles.leftContainer}>
        <MaterialIcons name={appIcon} size={36} color="#6200ee" />
        <Text style={styles.appName}>{appName}</Text>
      </View>

      {showMenu && (
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
      )}
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
