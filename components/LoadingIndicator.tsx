import React from 'react';
import {TextStyle} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

interface LoadingIndicatorProps {
  loading: boolean;
  text: string;
  style: TextStyle;
}

function LoadingIndicator(props: LoadingIndicatorProps) {
  const {loading, text, style} = props;

  return <Spinner visible={loading} textContent={text} textStyle={style} />;
}

export default React.memo(LoadingIndicator);
