import React, {useEffect, useRef, useContext, useState} from 'react';
import Repository from '../../../data/Repository';
import {
  Animated,
  Pressable,
  View,
  TextInput,
  Text,
  StyleSheet,
} from 'react-native';
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import {ThemeContext} from '../../../styles/ThemeContext';

interface LabelProps {
  count: number;
  barcode: string;
  validity: boolean;
  onDeletePressed: () => void;
}

function LabelComponent(props: LabelProps): JSX.Element {
  const {count, barcode, validity, onDeletePressed} = props;
  const {theme} = useContext(ThemeContext);
  const swipeablePanel = useRef();

  const [materialDescription, setMaterialDescription] = useState<
    string | undefined
  >('');

  useEffect(() => {
    const fetchMaterialBasicData = async () => {
      const materialBasicData = await Repository.getMaterialBasicData(
        barcode.split('-')[0],
      );

      setMaterialDescription(materialBasicData?.description);
    };

    fetchMaterialBasicData();
  }, []);

  //TODO: move animation to animations folder

  const renderLeftActions = (
    dragAnimatedValue: Animated.AnimatedInterpolation<number>,
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
              if (swipeablePanel.current !== undefined) {
                swipeablePanel.current.close();
                onDeletePressed();
              }
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
            editable={false}
            value={barcode + '\n' + materialDescription}
            multiline={true}
          />
          <Icon
            name={validity ? 'check' : 'close'}
            size={30}
            color={validity ? 'green' : 'red'}
          />
        </View>
      </Swipeable>
    </GestureHandlerRootView>
  );
}

const styles = (theme: any) =>
  StyleSheet.create({
    swipedRow: {
      flexDirection: 'row',
    },
    swipedContainer: {
      backgroundColor: 'red',
      borderRadius: 20,
      borderWidth: 1,
      borderColor: theme.borderColor,
      height: 60,
      width: 70,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      marginTop: 5,
      marginRight: 5,
    },
    swipedText: {
      color: 'white',
    },
    labelItemContainer: {
      borderWidth: 1,
      borderColor: theme.borderColor,
      backgroundColor: theme.secondaryForegroundColor,
      borderRadius: 20,
      margin: '3%',
      alignItems: 'center',
      flexDirection: 'row',
    },
    labelItem: {
      color: theme.secondaryTextColor,
      paddingLeft: '5%',
    },
  });

export default LabelComponent;
