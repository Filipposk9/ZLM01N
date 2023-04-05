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
import CodePush from 'react-native-code-push';

function AppStack(): JSX.Element {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    </ThemeProvider>
  );
}

const codePushOptions = {
  updateDialog: true,
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
  installMode: CodePush.InstallMode.ON_NEXT_RESUME,
};

const AppStackWithCodePush = CodePush(codePushOptions)(AppStack);

export default withAppStore<typeof AppStack>(AppStack);
