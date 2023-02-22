/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {withAppStore} from './redux/Store';
import {ThemeProvider} from './styles/ThemeContext';

import AppNavigation from './navigation';

function AppStack(): JSX.Element {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default withAppStore<typeof AppStack>(AppStack);
