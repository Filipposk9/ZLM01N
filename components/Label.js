import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import {TextInput, Text, View, Animated, Pressable} from 'react-native';
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';
import base64 from 'react-native-base64';
import CredentialStorage from '../credentials/CredentialStorage.js';
import SapRequestHandler from '../sap/SapRequestHandler.js';
import {styles} from '../styles/TransferPostingStyles.js';
import Icon from 'react-native-vector-icons/AntDesign';
import {ThemeContext} from '../styles/ThemeContext.js';

import UserContext, {MaterialText} from '../realm/DBSchema.js';

//FIXME: initial checkmark is always false

const Label = ({
  value,
  text,
  lgortIn,
  lgortOut,
  onDeletePressed,
  counter,
  validity,
}) => {
  const {theme} = useContext(ThemeContext);
  const [editable, setEditable] = useState(false);
  const [labelText, setLabelText] = useState('');
  const swipeablePanel = useRef(null);
  const [maktx, setMaktx] = useState('');
  const [matnr, setMatnr] = useState('');
  const [charg, setCharg] = useState('');
  const [menge, setMenge] = useState('');
  const [moveType, setMoveType] = useState('311');
  //TODO: implement interface in TS and remove mvt

  const {useRealm, useQuery, useObject} = UserContext;
  const realm = useRealm();
  const collection = useQuery(MaterialText);

  useEffect(() => {
    setMatnr(value.matnr);
    setCharg(value.charg);
    setMenge(value.menge);

    async function fetchMaterialBasicData() {
      const response = await SapRequestHandler.getMaterialBasicData(
        value.matnr,
        value.charg,
        value.menge,
        lgortIn,
      );

      if (response !== undefined) {
        response.map(item => {
          setMaktx(item.MAKTX);
          setLabelText(`${counter}. ${text}\n${item.MAKTX}`);
        });
      } else {
        let found = realm.objectForPrimaryKey('MaterialText', value.matnr);

        setMaktx(found.materialText);
        setLabelText(`${counter}. ${text}\n${found.materialText}`);
      }
    }

    fetchMaterialBasicData();
  }, [value]);

  const renderLeftActions = (
    progress: Animated.AnimatedInterpolation,
    dragAnimatedValue: Animated.AnimatedInterpolation,
  ) => {
    const opacity = dragAnimatedValue.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
      extrapolate: 'clamp',
    });
    return (
      <View style={styles(theme).swipedRow}>
        <Animated.View style={styles(theme).swipedContainer}>
          <Pressable
            onPress={() => {
              swipeablePanel.current.close();
              onDeletePressed();
            }}>
            <Text style={styles(theme).swipedText}>Διαγραφή</Text>
          </Pressable>
        </Animated.View>
      </View>
    );
  };

  return (
    <GestureHandlerRootView>
      <Swipeable ref={swipeablePanel} renderLeftActions={renderLeftActions}>
        <View style={styles(theme).labelItemContainer}>
          <TextInput
            style={styles(theme).labelItem}
            editable={editable}
            value={labelText}
            multiline={true}></TextInput>
          <Icon
            name={validity ? 'check' : 'close'}
            size={30}
            color={validity ? 'green' : 'red'}
          />
        </View>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

export default Label;
