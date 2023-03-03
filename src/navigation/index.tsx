import React, {useContext} from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import Login from '../screens/login/index';
import MainMenu from '../screens/mainmenu/index';
import TransferPosting from '../screens/transferposting/index';
import TransferPostingLog from '../screens/transferpostinglog/index';
import History from '../screens/history/index';
import Picking from '../screens/picking/index';
import GoodsIssues from '../screens/goodsissues/index';
import {RootStackParamList} from './types';
import {ThemeContext} from '../styles/ThemeContext';

const AppStack = createNativeStackNavigator<RootStackParamList>();
const Tab = createMaterialTopTabNavigator();

function TransferPostingTabs(): JSX.Element {
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
          backgroundColor: '#ffffff',
          borderRadius: 3,
        },
        tabBarLabelStyle: {
          fontSize: 16,
          fontWeight: 'bold',
          textTransform: 'none',
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
        component={MainMenu}
        options={{title: 'MainMenu'}}
      />
      {/* <AppStack.Screen
        name="TransferPosting"
        component={TransferPosting}
        options={{title: 'TransferPosting'}}
      /> */}
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
        component={Picking}
        options={{title: 'Picking'}}
      />
      <AppStack.Screen
        name="GoodsIssues"
        component={GoodsIssues}
        options={{title: 'GoodsIssues'}}
      />
    </AppStack.Navigator>
  );
}

export default AppNavigation;
