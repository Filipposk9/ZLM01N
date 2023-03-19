import React, {useEffect, useRef, useContext, useState, ReactNode} from 'react';
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
import {ThemeContext} from '../../../../appearance/theme/ThemeContext';
import HorizontalDrag from '../../../animations/HorizontalDrag';
import FadeIn from '../../../animations/FadeIn';

interface LabelComponentProps {
  count: number;
  barcode: string;
  validity: boolean;
  onDeletePressed: () => void;
}

//TODO: add animation fadeIn(), or spawn from top/left
//TODO: check scanned barcode validity using regex
//TODO: initial stock value (validity)

function LabelComponent(props: LabelComponentProps): JSX.Element {
  const {count, barcode, validity, onDeletePressed} = props;
  const {theme} = useContext(ThemeContext);
  const swipeablePanel = useRef<Swipeable>(null);

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

  const swipedPanel = (): Element => {
    return (
      <View style={styles(theme).swipedRow}>
        <Animated.View style={styles(theme).swipedContainer}>
          <Pressable
            onPress={() => {
              swipeablePanel.current?.close();
              onDeletePressed();
            }}>
            <Text style={styles(theme).swipedText}>Διαγραφή</Text>
          </Pressable>
        </Animated.View>
      </View>
    );
  };

  const horizontalDrag = HorizontalDrag.setInterpolate(swipedPanel);
  const fadeIn = FadeIn.setInterpolate();

  return (
    <GestureHandlerRootView>
      <Swipeable ref={swipeablePanel} renderLeftActions={horizontalDrag}>
        <Animated.View
          style={[
            styles(theme).labelItemContainer,
            {
              borderWidth: validity ? 0 : 1,
              borderColor: validity ? '' : 'red',
              opacity: fadeIn,
            },
          ]}>
          <TextInput
            style={styles(theme).labelItem}
            editable={false}
            value={count + '. ' + barcode + '\n' + materialDescription}
            multiline={true}
          />
        </Animated.View>
      </Swipeable>
    </GestureHandlerRootView>
  );
}

const styles = (theme: any) =>
  StyleSheet.create({
    swipedRow: {
      flexDirection: 'row',
      alignItems: 'center',
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
      elevation: 5,
      backgroundColor: theme.secondaryForegroundColor,
      borderRadius: 15,
      margin: '3%',
      alignItems: 'center',
      flexDirection: 'row',
      flex: 1,
    },
    labelItem: {
      fontSize: 15,
      color: theme.secondaryTextColor,
    },
  });

export default LabelComponent;
