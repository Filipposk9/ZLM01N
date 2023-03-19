/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {withAppStore} from './src/redux/Store';
import {ThemeProvider} from './src/appearance/theme/ThemeContext';

import AppNavigation from './src/navigation/index';

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
