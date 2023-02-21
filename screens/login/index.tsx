import React, {useState, useContext} from 'react';
import {View} from 'react-native';
import {styles} from '../../styles/LoginStyles.js';

import LoadingIndicator from '../../components/LoadingIndicator';
import {ThemeContext} from '../../styles/ThemeContext.js';

//TODO: Logout and clear()

const {theme, toggle} = useContext(ThemeContext);

function Login({navigation}: {navigation: any}): JSX.Element {
  const [username, setUsername] = useState('FILKOZ');
  const [password, setPassword] = useState('COMPO2SITION4');

  return (
    <LoginContainer>
      <LoadingIndicator />
    </LoginContainer>
  );
}

interface LoginContainerProps {
  children?: React.ReactNode;
}

const LoginContainer: React.FC<LoginContainerProps> = ({children}) => {
  return <View style={styles(theme).loginContainer}>{children}</View>;
};

export default React.memo(Login);
