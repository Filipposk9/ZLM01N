/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Provider } from 'react-redux';
import { Store } from './redux/Store';

import LoginScreen from './screens/Login';
import MainMenu from './screens/MainMenu';
import TransferPosting from './screens/TransferPosting';
import TransferPostingLog from './screens/TransferPostingLog';
import TransferPostingHistory from './screens/TransferPostingHistory';
import Picking from './screens/Picking';
import GoodsIssues from './screens/GoodsIssues';
import StorageLocationList from './screens/StorageLocationList';

import { ThemeProvider } from './styles/ThemeContext';
import UserContext from './realm/DBSchema';
const { RealmProvider } = UserContext;

type RootStackParamList = {
  Login: undefined;
  MainMenu: undefined;
  TransferPosting: undefined;
  TransferPostingLog: undefined;
  TransferPostingHistory: undefined;
  Picking: undefined;
  GoodsIssues: undefined;
  StorageLocationList: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppStack = (): JSX.Element => {
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
                options={{ title: 'Login' }}
              />
              <Stack.Screen
                name="MainMenu"
                component={MainMenu}
                options={{ title: 'MainMenu' }}
              />
              <Stack.Screen
                name="TransferPosting"
                component={TransferPosting}
                options={{ title: 'TransferPosting' }}
              />
              <Stack.Screen
                name="TransferPostingLog"
                component={TransferPostingLog}
                options={{ title: 'TransferPostingLog' }}
              />
              <Stack.Screen
                name="TransferPostingHistory"
                component={TransferPostingHistory}
                options={{ title: 'TransferPostingHistory' }}
              />
              <Stack.Screen
                name="Picking"
                component={Picking}
                options={{ title: 'Picking' }}
              />
              <Stack.Screen
                name="GoodsIssues"
                component={GoodsIssues}
                options={{ title: 'GoodsIssues' }}
              />
              <Stack.Screen
                name="StorageLocationList"
                component={StorageLocationList}
                options={{ title: 'StorageLocationList' }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </RealmProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default AppStack;