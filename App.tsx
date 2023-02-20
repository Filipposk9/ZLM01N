/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';

import {Provider} from 'react-redux';
import {Store} from './redux/Store';

import {ThemeProvider} from './styles/ThemeContext';
import UserContext from './realm/DBSchema';
const {RealmProvider} = UserContext;

import AppNavigation from './navigation';

function AppStack(): JSX.Element {
  return (
    <Provider store={Store}>
      <ThemeProvider>
        <RealmProvider>
          <NavigationContainer>
            <AppNavigation />
          </NavigationContainer>
        </RealmProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default AppStack;
