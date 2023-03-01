import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from '../screens/login/index';
import MainMenu from '../screens/mainmenu/index';
import TransferPosting from '../screens/transferposting/index';
import TransferPostingLog from '../screens/transferpostinglog/index';
import History from '../screens/history/index';
import Picking from '../screens/picking/index';
import GoodsIssues from '../screens/goodsissues/index';
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
      <AppStack.Screen
        name="StorageLocationList"
        component={StorageLocationList}
        options={{title: 'StorageLocationList'}}
      />
    </AppStack.Navigator>
  );
}

export default AppNavigation;
