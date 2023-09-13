import React, {useContext} from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import Login from '../screens/login/index';
import MainMenu from '../screens/mainmenu/index';
import Profile from '../screens/profile/index';
import Settings from '../screens/settings/index';
import TransferPosting from '../screens/transferposting/index';
import TransferPostingLog from '../screens/transferpostinglog/index';
import History from '../screens/history/index';
import Picking from '../screens/picking/index';
import GoodsIssues from '../screens/goodsissues/index';
import TankCharacteristics from '../screens/tankcharacteristics/index';
import TankMap from '../screens/tankmap/index';
import Mashes from '../screens/mashes/index';
import BarrelCharacteristics from '../screens/barrelcharacteristics/index';
import {RootStackParamList} from './types';
import {ThemeContext} from '../appearance/theme/ThemeContext';
import ViewFinder from '../utilities/components/ViewFinder';

//TODO: fix repeatable code

const AppStack = createNativeStackNavigator<RootStackParamList>();
const Tab = createMaterialTopTabNavigator();
const BottomTab = createMaterialTopTabNavigator();

function TransferPostingTabs({navigation}: {navigation: any}): JSX.Element {
  const {theme} = useContext(ThemeContext);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.textColor,
        tabBarInactiveTintColor: '#7a7a7a',
        tabBarPressColor: '#33333330',
        tabBarStyle: {
          backgroundColor: theme.backgroundColor,
        },
        tabBarIndicatorStyle: {
          borderRadius: 20,
          borderWidth: 1,
          borderColor: theme.tabBorderColor,
          height: 20,
          backgroundColor: '#00000000',
          marginBottom: '3%',
        },
        tabBarLabelStyle: {
          fontSize: 16,
          fontWeight: 'bold',
          textTransform: 'none',
          borderColor: theme.tabBorderColor,
        },
      }}>
      <Tab.Screen
        name="TransferPostingMain"
        component={TransferPosting}
        options={{title: 'Ενδοδιακινήσεις'}}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{title: 'Ιστορικό'}}
      />
    </Tab.Navigator>
  );
}

function PickingTabs({navigation}: {navigation: any}): JSX.Element {
  const {theme} = useContext(ThemeContext);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.textColor,
        tabBarInactiveTintColor: '#7a7a7a',
        tabBarPressColor: '#33333330',
        tabBarStyle: {
          backgroundColor: theme.backgroundColor,
        },

        tabBarIndicatorStyle: {
          borderRadius: 20,
          borderWidth: 1,
          borderColor: theme.tabBorderColor,
          height: 20,
          backgroundColor: '#00000000',
          marginBottom: '3%',
        },
        tabBarLabelStyle: {
          fontSize: 16,
          fontWeight: 'bold',
          textTransform: 'none',
          borderColor: theme.tabBorderColor,
        },
      }}>
      <Tab.Screen
        name="PickingMain"
        component={Picking}
        options={{title: 'Picking'}}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{title: 'Ιστορικό'}}
      />
    </Tab.Navigator>
  );
}

function GoodsIssuesTabs({navigation}: {navigation: any}): JSX.Element {
  const {theme} = useContext(ThemeContext);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.textColor,
        tabBarInactiveTintColor: '#7a7a7a',
        tabBarPressColor: '#33333330',
        tabBarStyle: {
          backgroundColor: theme.backgroundColor,
        },

        tabBarIndicatorStyle: {
          borderRadius: 20,
          borderWidth: 1,
          borderColor: theme.tabBorderColor,
          height: 20,
          backgroundColor: '#00000000',
          marginBottom: '3%',
        },
        tabBarLabelStyle: {
          fontSize: 16,
          fontWeight: 'bold',
          textTransform: 'none',
          borderColor: theme.tabBorderColor,
        },
      }}>
      <Tab.Screen
        name="GoodsIssuesMain"
        component={GoodsIssues}
        options={{title: 'Αναλώσεις'}}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{title: 'Ιστορικό'}}
      />
    </Tab.Navigator>
  );
}

function TankCharacteristicsTabs({navigation}: {navigation: any}): JSX.Element {
  const {theme} = useContext(ThemeContext);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.textColor,
        tabBarInactiveTintColor: '#7a7a7a',
        tabBarPressColor: '#33333330',
        tabBarStyle: {
          backgroundColor: theme.backgroundColor,
        },

        tabBarIndicatorStyle: {
          borderRadius: 20,
          borderWidth: 1,
          borderColor: theme.tabBorderColor,
          height: 35,
          backgroundColor: '#00000000',
          marginBottom: '3%',
        },
        tabBarLabelStyle: {
          fontSize: 16,
          fontWeight: 'bold',
          textTransform: 'none',
          borderColor: theme.tabBorderColor,
        },
      }}>
      <Tab.Screen
        name="TankCharacteristicsM"
        component={TankCharacteristics}
        options={{title: 'Καταχώριση Χαρακτηριστικών'}}
      />
      <Tab.Screen
        name="TankMap"
        component={TankMap}
        options={{title: 'Χάρτης Δεξαμενών'}}
      />
    </Tab.Navigator>
  );
}

function MashesTabs({navigation}: {navigation: any}): JSX.Element {
  const {theme} = useContext(ThemeContext);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.textColor,
        tabBarInactiveTintColor: '#7a7a7a',
        tabBarPressColor: '#33333330',
        tabBarStyle: {
          backgroundColor: theme.backgroundColor,
        },

        tabBarIndicatorStyle: {
          borderRadius: 20,
          borderWidth: 1,
          borderColor: theme.tabBorderColor,
          height: 20,
          backgroundColor: '#00000000',
          marginBottom: '3%',
        },
        tabBarLabelStyle: {
          fontSize: 16,
          fontWeight: 'bold',
          textTransform: 'none',
          borderColor: theme.tabBorderColor,
        },
      }}>
      <Tab.Screen
        name="MashesMain"
        component={Mashes}
        options={{title: 'Λιώματα'}}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{title: 'Ιστορικό'}}
      />
    </Tab.Navigator>
  );
}

function BarrelCharacteristicsTabs({
  navigation,
}: {
  navigation: any;
}): JSX.Element {
  const {theme} = useContext(ThemeContext);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.textColor,
        tabBarInactiveTintColor: '#7a7a7a',
        tabBarPressColor: '#33333330',
        tabBarStyle: {
          backgroundColor: theme.backgroundColor,
        },

        tabBarIndicatorStyle: {
          borderRadius: 20,
          borderWidth: 1,
          borderColor: theme.tabBorderColor,
          height: 35,
          backgroundColor: '#00000000',
          marginBottom: '3%',
        },
        tabBarLabelStyle: {
          fontSize: 16,
          fontWeight: 'bold',
          textTransform: 'none',
          borderColor: theme.tabBorderColor,
        },
      }}>
      <Tab.Screen
        name="BarrelCharacteristicsMain"
        component={BarrelCharacteristics}
        options={{title: 'Ποιοτικά Χαρακτηριστικά'}}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{title: 'Ιστορικό'}}
      />
    </Tab.Navigator>
  );
}

function HomeTabs({navigation}: {navigation: any}): JSX.Element {
  const {theme} = useContext(ThemeContext);

  return (
    <BottomTab.Navigator
      tabBarPosition="bottom"
      screenOptions={{
        tabBarActiveTintColor: theme.textColor,
        tabBarInactiveTintColor: '#7a7a7a',
        tabBarPressColor: '#33333330',
        tabBarStyle: {
          backgroundColor: theme.backgroundColor,
        },

        tabBarIndicatorStyle: {
          borderWidth: 1,
          borderColor: theme.tabBorderColor,
          backgroundColor: '#00000000',
        },
        tabBarLabelStyle: {
          fontSize: 16,
          fontWeight: 'bold',
          textTransform: 'none',
          borderColor: theme.tabBorderColor,
        },
      }}>
      <BottomTab.Screen
        name="Home"
        component={MainMenu}
        options={{title: 'MainMenu'}}
      />
      <BottomTab.Screen
        name="Profile"
        component={Profile}
        options={{title: 'Profile'}}
      />
      <BottomTab.Screen
        name="Settings"
        component={Settings}
        options={{title: 'Settings'}}
      />
    </BottomTab.Navigator>
  );
}

function AppNavigation(): JSX.Element {
  return (
    <AppStack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}>
      <AppStack.Screen
        name="Login"
        component={Login}
        options={{title: 'Login'}}
      />
      <AppStack.Screen
        name="MainMenu"
        component={HomeTabs}
        options={{title: 'Home'}}
      />
      <AppStack.Screen
        name={'TransferPosting'}
        component={TransferPostingTabs}
        options={{title: 'TransferPosting'}}
      />
      <AppStack.Screen
        name="TransferPostingLog"
        component={TransferPostingLog}
        options={{title: 'TransferPostingLog'}}
      />
      <AppStack.Screen
        name="History"
        component={History}
        options={{title: 'History'}}
      />
      <AppStack.Screen
        name="Picking"
        component={PickingTabs}
        options={{title: 'Picking'}}
      />
      <AppStack.Screen
        name="GoodsIssues"
        component={GoodsIssuesTabs}
        options={{title: 'GoodsIssues'}}
      />
      <AppStack.Screen
        name="TankCharacteristics"
        component={TankCharacteristicsTabs}
        options={{title: 'TankCharacteristics'}}
      />
      <AppStack.Screen
        name="Mashes"
        component={MashesTabs}
        options={{title: 'Mashes'}}
      />
      <AppStack.Screen
        name="BarrelCharacteristics"
        component={BarrelCharacteristicsTabs}
        options={{title: 'BarrelCharacteristics'}}
      />
      <AppStack.Screen
        name={'ViewFinder'}
        component={ViewFinder}
        options={{title: 'Camera'}}
      />
    </AppStack.Navigator>
  );
}

export default AppNavigation;
