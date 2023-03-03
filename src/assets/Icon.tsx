import React from 'react';
import {Text} from 'react-native';
import IconFeather from 'react-native-vector-icons/Feather';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type IconProps = {
  name: string;
  size: number;
  color: string;
};

function Icon(props: IconProps): JSX.Element {
  const {name, ...otherProps} = props;
  switch (name) {
    case 'forklift':
      return <IconMaterialCommunityIcons {...otherProps} name={name} />;
    case 'truck':
      return <IconFeather {...otherProps} name={name} />;
    case 'material-ui':
      return <IconMaterialCommunityIcons {...otherProps} name={name} />;
    case 'propane-tank-outline':
      return <IconMaterialCommunityIcons {...otherProps} name={name} />;
    case 'trash-2':
      return <IconFeather {...otherProps} name={name} />;
    case 'barcode-scan':
      return <IconMaterialCommunityIcons {...otherProps} name={name} />;
    default:
      return <Text> </Text>;
  }
}

export default React.memo(Icon);
