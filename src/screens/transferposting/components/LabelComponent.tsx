import React, {useEffect, useRef, useContext, useState} from 'react';
import Repository from '../../../data/Repository';
import {Animated, Pressable, TextInput, Text, StyleSheet} from 'react-native';
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';
import {ThemeContext} from '../../../appearance/theme/ThemeContext';

interface LabelComponentProps {
  count: number;
  barcode: string;
  validity: boolean;
  onDeletePressed: () => void;
}

function LabelComponent(props: LabelComponentProps): JSX.Element {
  const {count, barcode, onDeletePressed} = props;
  const {theme} = useContext(ThemeContext);
  const swipeablePanel = useRef<Swipeable>(null);

  const [materialDescription, setMaterialDescription] = useState<
    string | undefined
  >('');

  const [validity, setValidity] = useState<boolean>(false);

  useEffect(() => {
    const fetchMaterialBasicData = async () => {
      const materialBasicData = await Repository.getMaterialBasicData(
        barcode.split('-')[0],
      );

      setMaterialDescription(materialBasicData?.description);
    };

    fetchMaterialBasicData();

    setValidity(props.validity);
  }, []);

  const swipedPanel = (): JSX.Element => {
    return (
      <Animated.View style={styles(theme).swipedContainer}>
        <Pressable
          onPress={() => {
            swipeablePanel.current?.close();
            onDeletePressed();
          }}>
          <Text style={styles(theme).swipedText}>Διαγραφή</Text>
        </Pressable>
      </Animated.View>
    );
  };

  return (
    <GestureHandlerRootView>
      <Swipeable
        ref={swipeablePanel}
        renderLeftActions={swipedPanel}
        leftThreshold={10}>
        <Animated.View
          style={[
            styles(theme).labelItemContainer,
            {
              borderWidth: validity ? 0 : 1,
              borderColor: validity ? '' : 'red',
            },
          ]}>
          <Text style={styles(theme).labelItemLeft}>{count}</Text>
          <TextInput
            style={styles(theme).labelItemRight}
            editable={false}
            value={barcode + '\n' + materialDescription}
            multiline={true}
          />
        </Animated.View>
      </Swipeable>
    </GestureHandlerRootView>
  );
}

const styles = (theme: any) =>
  StyleSheet.create({
    swipedContainer: {
      elevation: 5,
      backgroundColor: 'red',
      borderRadius: 15,
      margin: '3%',
      alignItems: 'center',
      justifyContent: 'center',
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
    labelItemLeft: {
      fontSize: 32,
      color: theme.buttonTextColor,
      margin: '2%',
    },
    labelItemRight: {
      fontSize: 16,
      width: '80%',
      color: theme.buttonTextColor,
    },
  });

export default LabelComponent;
