import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from '../screens/login';
import MainMenu from '../screens/MainMenu';
import TransferPosting from '../screens/TransferPosting';
import TransferPostingLog from '../screens/TransferPostingLog';
import TransferPostingHistory from '../screens/TransferPostingHistory';
import Picking from '../screens/Picking';
import GoodsIssues from '../screens/GoodsIssues';
import StorageLocationList from '../screens/StorageLocationList';

import {RootStackParamList} from './types';

const AppStack = createNativeStackNavigator<RootStackParamList>();

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
      <AppStack.Screen
        name="TransferPosting"
        component={TransferPosting}
        options={{title: 'TransferPosting'}}
      />
      <AppStack.Screen
        name="TransferPostingLog"
        component={TransferPostingLog}
        options={{title: 'TransferPostingLog'}}
      />
      <AppStack.Screen
        name="TransferPostingHistory"
        component={TransferPostingHistory}
        options={{title: 'TransferPostingHistory'}}
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
      <AppStack.Screen
        name="StorageLocationList"
        component={StorageLocationList}
        options={{title: 'StorageLocationList'}}
      />
    </AppStack.Navigator>
  );
}

export default AppNavigation;
