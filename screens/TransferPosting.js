import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback,
} from 'react';
import {Pressable, TextInput, ScrollView, Text, View} from 'react-native';

import {connect, useDispatch} from 'react-redux';
import {storeLog} from '../redux/actions/StoreGoodsMovementLogAction.js';
import {storeQueue} from '../redux/actions/StoreTransferPostingQueueAction.js';
import {useSelector} from 'react-redux';

import SapRequestHandler from '../sap/SapRequestHandler.js';

import Spinner from 'react-native-loading-spinner-overlay';
import StorageLocationSelectList from '../components/StorageLocationSelectList.js';
import Label from '../components/Label2.js';
import TypedLabelInserterPopup from '../components/TypedLabelInserterPopup.js';

import {styles} from '../styles/TransferPostingStyles.js';
import {GlobalStyles} from '../styles/GlobalStyles';
import {ThemeContext} from '../styles/ThemeContext.js';

import GoodsMovementLog from '../objects/GoodsMovementLog.js';

import NetInfo from '@react-native-community/netinfo';

export default TransferPosting = ({navigation}) => {
  const dispatch = useDispatch();

  const {dark, theme, toggle} = useContext(ThemeContext);
  const collection = useQuery(MaterialText);

  const storeGoodsMovementLog = goodsMovementLog => {
    dispatch(storeLog(goodsMovementLog));
  };

  const storeTransferPostingQueue = transferPostingQueue => {
    dispatch(storeQueue(transferPostingQueue));
  };

  const [lgortIn, setLgortIn] = useState();
  const [lgortOut, setLgortOut] = useState();
  const invisibleInputRef = useRef();
  const typedLabelInserterRef = useRef();

  const [loading, setLoading] = useState(false);

  const [lgortInKey, setLgortInKey] = useState(10000);
  const [lgortOutKey, setLgortOutKey] = useState(10001);

  const [invisibleText, setInvisibleText] = useState();

  const [labelText, setLabelText] = useState([]);
  const [labelQueue, setLabelQueue] = useState([]);

  const onStorageLocationInChange = async lgortIn => {
    setLgortIn(lgortIn);

    let connectionState = await getConnectionState();

    if (
      labelText.length > 0 &&
      connectionState.isConnected &&
      connectionState.details.strength >= 50
    ) {
      const newValidity = await SapRequestHandler.getLabelStock(
        labelText,
        lgortIn,
      );

      setLabelText(newValidity);
    }
  };

  const onStorageLocationOutChange = lgortOut => {
    setLgortOut(lgortOut);
  };

  useEffect(() => {
    handleAddMaterialTexts();

    //FIXME: unsubscribe does not work

    const unsubscribe = navigation.addListener('focus', () => {
      if (invisibleInputRef.current) invisibleInputRef.current.focus();
    });

    return unsubscribe;
  }, [navigation]);

  const focusInvisibleInput = e => {
    e.preventDefault();
    if (invisibleInputRef.current) {
      invisibleInputRef.current.focus();
    }
  };

  const transferPostingQueue = useSelector(
    store => store.transferPostingQueue.transferPostingQueue,
  );

  const handleQueueEntries = async () => {
    let connectionState = await getConnectionState();

    console.log(transferPostingQueue, 'queue');

    if (connectionState.isConnected && connectionState.details.strength >= 50) {
      if (transferPostingQueue.length > 0) {
        let i = 0;

        while (
          transferPostingQueue.length > 0 &&
          transferPostingQueue.length !== undefined
        ) {
          const response = await SapRequestHandler.createGoodsMovement(
            lgortIn,
            lgortOut,
            transferPostingQueue[i],
            '04',
          );

          if (response !== undefined) {
            transferPostingQueue.splice(i++, 1);
          }

          console.log(response, 'response');
          console.log(transferPostingQueue, 'queue');

          storeQueue(transferPostingQueue);
        }
      }
    }
  };

  const handleAddMaterialTexts = useCallback(async () => {
    const response = await SapRequestHandler.getMaterialBasicData(
      1,
      '',
      '',
      '',
    );

    if (!response) return;

    let length = response.length;

    realm.write(() => {
      for (let i = 0; i < length; i++) {
        let found = realm.objectForPrimaryKey(
          'MaterialText',
          response[i].MATNR,
        );

        if (!found) {
          realm.create(
            'MaterialText',
            MaterialText.generate(response[i].MATNR, response[i].MAKTX),
          );
        }
      }
    });
  });

  const getConnectionState = async () => {
    return await NetInfo.fetch().then(async state => {
      return await state;
    });
  };

  const addLabel = text => {
    let scannedLabel = text.split('-');

    let matnr = scannedLabel[0];
    let charg = scannedLabel[1];
    let menge = scannedLabel[2];

    let barcode = text;

    setLabelText([
      ...labelText,
      {
        count: labelText.length + 1,
        matnr,
        charg,
        menge,
        barcode,
        validity: false,
        movetype: '311',
        aufnr: '',
      },
    ]);
  };

  //TODO: make tempqueue persistent in redux

  const removeLabel = i => {
    const currentLabels = labelText;
    currentLabels.splice(i, 1);
    setLabelText(currentLabels);
  };

  const resetScreenValues = () => {
    setLabelText([]);

    setLgortInKey(lgortInKey - 1);
    setLgortOutKey(lgortOutKey + 1);
  };

  return (
    <View
      onTouchStart={() => {
        handleQueueEntries();
        focusInvisibleInput;
      }}
      style={styles(theme).transferPostingContainer}>
      {/* Loading Indicator */}
      {/*<Spinner
        visible={loading}
        textContent={'Πραγματοποιείται ενδοδιακίνηση...'}
        textStyle={{color: 'white'}}
      />*/}

      {/*Storage Location Selectors */}
      <StorageLocationSelectList
        placeholder="Αποθηκευτικός Χώρος Προέλευσης"
        onStorageLocationChange={onStorageLocationInChange}
        key={lgortInKey}
      />

      <StorageLocationSelectList
        placeholder="Αποθηκευτικός Χώρος Προορισμού"
        onStorageLocationChange={onStorageLocationOutChange}
        key={lgortOutKey}
      />

      {/*Main Body which spawns labels on scan*/}
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View
          style={styles(theme).invisibleInputContainer}
          onTouchStart={focusInvisibleInput}>
          {/* Main Body uses an invisible text input to spawn a new label as soon as its scanned on this screen*/}
          <TextInput
            ref={invisibleInputRef}
            showSoftInputOnFocus={false}
            autoFocus={true}
            autoCorrect={false}
            autoComplete={'off'}
            caretHidden={true}
            style={{opacity: 0, height: 0}}
            value={invisibleText}
            onChangeText={invisibleText => {
              if (lgortIn !== '') {
                addLabel(invisibleText), setInvisibleText('');
              } else {
                setInvisibleText('');
                //FIXME: //alert('Εισάγετε αποθηκευτικό χώρο');
              }
            }}
          />
        </View>

        {/* contents of the invisible text input are pushed into textInputArray and returned to main as objects of <Label> */}
        <View>
          {labelText.length > 0
            ? labelText.map((key, i) => {
                return (
                  <Label
                    key={i}
                    value={labelText[i]}
                    text={labelText[i].barcode}
                    counter={labelText.length}
                    lgortIn={lgortIn}
                    lgortOut={lgortOut}
                    validity={labelText[i].validity}
                    onDeletePressed={() => {
                      removeLabel(i);
                    }}
                  />
                );
              })
            : null}
        </View>
      </ScrollView>

      {/* Bottom panel */}
      <View style={styles(theme).bottomPanelContainer}>
        {/*Transfer Posting History Button */}
        <View style={styles(theme).historyBtnContainer}>
          <Pressable
            onPress={() => {
              navigation.navigate('TransferPostingHistory');
            }}
            style={styles(theme).historyBtn}
            android_ripple={GlobalStyles(theme).rippleColor}>
            <Text style={styles(theme).historyBtnText}>Ιστορικό</Text>
          </Pressable>
        </View>

        {/*Add Label Manually Button*/}
        <View style={styles(theme).addLabelBtnContainer}>
          <Pressable
            onPress={() => {
              typedLabelInserterRef.current.setState({visibility: true});
            }}
            style={styles(theme).addLabelBtn}
            android_ripple={GlobalStyles(theme).rippleColor}>
            <Text style={styles(theme).addLabelBtnText}>+</Text>
          </Pressable>
        </View>
      </View>

      {/*Hidden Popup for typed label inserts */}
      <TypedLabelInserterPopup
        onSubmit={() => {
          addLabel(typedLabelInserterRef.current.state.barcode);
        }}
        ref={typedLabelInserterRef}
      />

      {/* Submit form to SAP */}
      <View style={styles(theme).submitBtnContainer}>
        <Pressable
          style={styles(theme).submitBtn}
          onPress={async () => {
            let lgortValid = false;

            if (lgortIn == '' || lgortOut == '') {
              alert('Εισάγετε αποθηκευτικό χώρο');
            } else {
              if (lgortIn == lgortOut) {
                alert(
                  'Ο αποθηκευτικός χώρος προέλευσης είναι ίδιος με τον αποθηκευτικό χώρο προορισμού',
                );
              } else {
                lgortValid = true;
              }
            }

            const connectionState = await getConnectionState();

            if (
              connectionState.isConnected &&
              connectionState.details.strength >= 50
            ) {
              if (lgortValid && labelText.length > 0) {
                setLoading(true);

                SapRequestHandler.createGoodsMovement(
                  lgortIn,
                  lgortOut,
                  labelText,
                  '04',
                ).then(log => {
                  setLoading(false);

                  let goodsMvtLog = new GoodsMovementLog(log);

                  storeGoodsMovementLog(goodsMvtLog);
                  resetScreenValues();

                  navigation.navigate('TransferPostingLog', [
                    goodsMvtLog,
                    lgortIn,
                    lgortOut,
                  ]);
                });
              } else {
                alert('Άδειο παραστατικο');
              }
            } else {
              if (labelText.length > 0) {
                storeTransferPostingQueue(labelText);

                resetScreenValues();
              } else {
                alert('Άδειο παραστατικό');
              }
            }

            //TODO: turn lgortIn/lgortOut into header fields
          }}
          android_ripple={GlobalStyles(theme).rippleColor}>
          <Text style={styles(theme).submitBtnText}>Καταχώριση</Text>
        </Pressable>
      </View>
    </View>
  );
};
