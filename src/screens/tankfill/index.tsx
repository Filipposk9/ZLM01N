import React, {useContext, useState} from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import {ThemeContext} from '../../appearance/theme/ThemeContext';
import {styles} from '../../appearance/styles/TankFillStyles';
import BarcodeScanner from '../../utilities/components/BarcodeScanner';
import {Label, MaterialDocument} from '../../shared/Types';
import BarcodeValidator from '../../utilities/validators/BarcodeValidator';
import LabelComponent from '../transferposting/components/LabelComponent';
import Repository from '../../data/Repository';
import {
  GOODS_MOVEMENT_CODE,
  MOVEMENT_TYPE,
  PRODUCTION_ORDER,
} from '../../shared/Constants';
import {GlobalStyles} from '../../appearance/styles/GlobalStyles';

function TankFill() {
  const {theme} = useContext(ThemeContext);

  const [tank, setTank] = useState<string>('CU123');
  const [tankEditability, setTankEditability] = useState<boolean>(true);

  const [scannedLabels, setScannedLabels] = useState<Label[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const scrollViewRef = React.useRef<ScrollView>(null);
  const scannerRef = React.useRef<TextInput>(null);

  const addLabel = async (lastScannedBarcode: string) => {
    if (lastScannedBarcode !== '') {
      const [materialNumber, batch, quantityString] =
        lastScannedBarcode.split('-');
      const quantity = Number(quantityString.replace(',', '.'));

      const newLabel = {
        count: 1,
        materialNumber: materialNumber,
        batch: batch,
        quantity: quantity,
        validity: true,
      };

      setScannedLabels(
        scannedLabels.length > 0
          ? [
              ...scannedLabels,
              {
                ...newLabel,
                count: scannedLabels[scannedLabels.length - 1].count + 1,
              },
            ]
          : [newLabel],
      );
    }
  };

  const removeLabel = (index: number) => {
    const updatedLabels = scannedLabels.filter((_item, i) => i !== index);

    if (updatedLabels) {
      setScannedLabels([]);
      setScannedLabels(updatedLabels);
    }
  };

  const resetScreenComponents = () => {
    setScannedLabels([]);
  };

  const submitGoodsMovement = (labels: Label[]) => {
    const submitGoodsMovement = async (
      labels: Label[],
    ): Promise<MaterialDocument | undefined> => {
      // const materialDocument = await Repository.createGoodsMovement(
      //   GOODS_MOVEMENT_CODE.TRANSFER_POSTING,
      //   labels,
      //   MOVEMENT_TYPE.TRANSFER_POSTING,
      //   PRODUCTION_ORDER.BLANK,
      // );

      const materialDocument = await Repository.fillTank(tank, labels);

      resetScreenComponents();

      return materialDocument;
    };

    if (labels.length > 0) {
      return submitGoodsMovement(labels);
    } else {
      Alert.alert('Σφάλμα', 'Αδειο παραστατικό');
    }
  };

  return (
    <View style={styles(theme).tankFillContainer}>
      <View
        style={styles(theme).topContainer}
        onTouchStart={() => {
          setTankEditability(true);
        }}>
        <TextInput
          style={styles(theme).selectedTankText}
          value={tank}
          editable={tankEditability}
          onChangeText={tank => {
            setTank(tank);
          }}
          onSubmitEditing={() => setTankEditability(false)}></TextInput>
      </View>

      <ScrollView
        ref={scrollViewRef}
        contentInsetAdjustmentBehavior="automatic"
        onContentSizeChange={() =>
          scrollViewRef.current?.scrollToEnd({animated: true})
        }
        style={styles(theme).labelList}>
        {scannedLabels.length > 0
          ? scannedLabels.map((item, i) => {
              if (item) {
                return (
                  <LabelComponent
                    key={item.count}
                    count={item.count}
                    barcode={
                      item.materialNumber +
                      '-' +
                      item.batch +
                      '-' +
                      item.quantity
                    }
                    validity={item.validity}
                    onDeletePressed={() => removeLabel(i)}
                  />
                );
              }
            })
          : null}
      </ScrollView>

      <View style={styles(theme).bottomContainer}>
        <View style={styles(theme).submitButtonContainer}>
          <Pressable
            style={styles(theme).submitButton}
            onPress={async () => {
              setIsLoading(true);

              const goodsMovementLog = await submitGoodsMovement(scannedLabels);
              setIsLoading(false);

              // if (goodsMovementLog) {
              //   dispatch(setGoodsMovementLog(goodsMovementLog));

              //   navigation.navigate('TransferPostingLog', [goodsMovementLog]);
              // } else {
              //   if (scannedLabels.length > 0 && storageLocationsAreValid()) {
              //     resetScreenComponents();
              //     Alert.alert(
              //       'Ανεπαρκές Σήμα',
              //       'Το παραστατικό προστέθηκε στην ουρά',
              //     );
              //   }
              // }
            }}
            android_ripple={GlobalStyles(theme).rippleColor}>
            <Text style={styles(theme).submitButtonText}>Καταχώριση</Text>
          </Pressable>
        </View>
      </View>

      <View style={{height: 0}}>
        <BarcodeScanner
          reference={scannerRef}
          onScan={lastScannedBarcode => {
            addLabel(lastScannedBarcode);
          }}
          validator={lastScannedBarcode =>
            BarcodeValidator.validateBarrelLabel(lastScannedBarcode)
          }
        />
      </View>
    </View>
  );
}

export default React.memo(TankFill);
