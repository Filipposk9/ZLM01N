/**
 * SAP Transfer Posting APP
 * https://github.com/Konstolymp
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Provider} from 'react-redux';
import {Store} from './redux/Store.js';

import LoginScreen from './screens/Login.js';
import MainMenu from './screens/MainMenu.js';
import TransferPosting from './screens/TransferPosting.js';
import TransferPostingLog from './screens/TransferPostingLog.js';
import TransferPostingHistory from './screens/TransferPostingHistory.js';
import Picking from './screens/Picking.js';
import GoodsIssues from './screens/GoodsIssues.js';
import StorageLocationList from './screens/StorageLocationList.js';

import {ThemeProvider} from './styles/ThemeContext.js';

import UserContext from './realm/DBSchema.js';
const {RealmProvider} = UserContext;

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Provider store={Store}>
      <ThemeProvider>
        <RealmProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Login"
              screenOptions={{
                headerShown: false,
              }}>
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{title: 'Login'}}
              />
              <Stack.Screen
                name="MainMenu"
                component={MainMenu}
                options={{title: 'MainMenu'}}
              />
              <Stack.Screen
                name="TransferPosting"
                component={TransferPosting}
                options={{title: 'TransferPosting'}}
              />
              <Stack.Screen
                name="TransferPostingLog"
                component={TransferPostingLog}
                options={{title: 'TransferPostingLog'}}
              />
              <Stack.Screen
                name="TransferPostingHistory"
                component={TransferPostingHistory}
                options={{title: 'TransferPostingHistory'}}
              />
              <Stack.Screen
                name="Picking"
                component={Picking}
                options={{title: 'Picking'}}
              />
              <Stack.Screen
                name="GoodsIssues"
                component={GoodsIssues}
                options={{title: 'GoodsIssues'}}
              />
              <Stack.Screen
                name="StorageLocationList"
                component={StorageLocationList}
                options={{title: 'StorageLocationList'}}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </RealmProvider>
      </ThemeProvider>
    </Provider>
  );
};
export default AppStack;
