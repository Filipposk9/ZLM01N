import React from 'react';
import {iTheme} from './types';

const themes: {[key: string]: iTheme} = {
  dark: {
    backgroundColor: '#1c2228',
    foregroundColor: '#29313a',
    secondaryForegroundColor: '#4a525b',

    buttonBackgroundColor: '#5070F4',
    buttonSecondaryBackgroundColor: '#ED8B00',
    buttonThirdBackgroundColor: '#5070F4',

    borderColor: '#7a7a7a',

    iconColor: '#ffffff',

    buttonBorderColor: '#ffffff',

    textColor: '#ffffff',
    buttonTextColor: '#ffffff',
    secondaryTextColor: '#ffffff',

    rippleColor: '#344b5f',

    tabBorderColor: '#5070F4',
  },
  light: {
    backgroundColor: '#ffffff',
    foregroundColor: '#95aa9d',
    secondaryForegroundColor: '#6c8776',

    buttonBackgroundColor: '#95aa9d',
    buttonSecondaryBackgroundColor: '#ff964f',
    buttonThirdBackgroundColor: '#6b8575',

    borderColor: '#7a7a7a',

    iconColor: '#7a7a7a',

    buttonBorderColor: '#ffffff',

    textColor: '#7a7a7a',
    buttonTextColor: '#ffffff',
    secondaryTextColor: '#444444',

    tabBorderColor: '#6c8776',

    rippleColor: '#a0c4c2',
  },
};

const initialState = {
  dark: false,
  theme: themes.light,
  toggle: () => {},
};

const ThemeContext = React.createContext(initialState);

function ThemeProvider({children}: any) {
  const [dark, setDark] = React.useState(false); // Default theme is light

  // Toggle between dark and light modes
  const toggle = () => {
    setDark(!dark);
  };

  // Filter the styles based on the theme selected
  const theme = dark ? themes.dark : themes.light;

  return (
    <ThemeContext.Provider value={{theme, dark, toggle}}>
      {children}
    </ThemeContext.Provider>
  );
}

export {ThemeProvider, ThemeContext};
