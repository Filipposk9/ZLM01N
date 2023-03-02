import React from 'react';
//TODO: change secondary foreground color

const themes = {
  dark: {
    backgroundColor: '#1c2228',
    foregroundColor: '#29313a',
    secondaryForegroundColor: '#29313a',

    buttonBackgroundColor: '#5070F4',

    borderColor: '#ffffff',
    buttonBorderColor: '#ffffff',

    textColor: '#ffffff',
    buttonTextColor: '#ffffff',
    secondaryTextColor: '#ffffff',

    rippleColor: '#344b5f',
  },
  light: {
    backgroundColor: '#ffffff',
    foregroundColor: '#95aa9d',
    secondaryForegroundColor: '#6c8776',
    //secondaryForegroundColor: '#EDC9AF',

    buttonBackgroundColor: '#95aa9d',

    borderColor: '#777777',
    buttonBorderColor: '#ffffff',

    textColor: '#000000',
    buttonTextColor: '#ffffff',
    secondaryTextColor: '#444444',

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
