import React from 'react';
import {Text} from 'react-native';
import IconFeather from 'react-native-vector-icons/Feather';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconOcticons from 'react-native-vector-icons/Octicons';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

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
    case 'propane-tank':
      return <IconMaterialCommunityIcons {...otherProps} name={name} />;
    case 'propane-tank-outline':
      return <IconMaterialCommunityIcons {...otherProps} name={name} />;
    case 'fruit-cherries':
      return <IconMaterialCommunityIcons {...otherProps} name={name} />;
    case 'trash-2':
      return <IconFeather {...otherProps} name={name} />;
    case 'barcode-scan':
      return <IconMaterialCommunityIcons {...otherProps} name={name} />;
    case 'up':
      return <IconAntDesign {...otherProps} name={name} />;
    case 'down':
      return <IconAntDesign {...otherProps} name={name} />;
    case 'issue-reopened':
      return <IconOcticons {...otherProps} name={name} />;
    case 'moon':
      return <IconFeather {...otherProps} name={name} />;
    case 'barrel':
      return <IconMaterialCommunityIcons {...otherProps} name={name} />;
    case 'linked-camera':
      return <IconMaterialIcons {...otherProps} name={name} />;
    case 'keyboard-arrow-left':
      return <IconMaterialIcons {...otherProps} name={name} />;
    case 'keyboard-arrow-right':
      return <IconMaterialIcons {...otherProps} name={name} />;
    case 'circle-thin':
      return <IconFontAwesome {...otherProps} name={name} />;
    case 'circle':
      return <IconFontAwesome {...otherProps} name={name} />;
    case 'basket-fill':
      return <IconMaterialCommunityIcons {...otherProps} name={name} />;
    default:
      return <Text> </Text>;
  }
}

export default React.memo(Icon);
