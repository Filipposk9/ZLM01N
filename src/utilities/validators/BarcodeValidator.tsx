class BarcodeValidator {
  validateBarrelLabel(barcode: string): boolean {
    const [materialNumber, batch, quantityString] = barcode.split('-');

    let quantity;
    if (quantityString) {
      quantity = Number(quantityString.replace(',', '.'));
    } else {
      return false;
    }

    const materialNumberRegex = new RegExp('^(1[0]|2[0-2]|30|4[0-2])[0-9]{7}$');
    const batchRegex = new RegExp(
      '^(0{2}[0-9]{8}|[0-9]{5}(X|F)[0-9]{4}|[0-9]{5}((BS(A|B|C|D)[0-9]{2})|(C(B|I|P|S|T|U|X|Y)[0-9]{3})|(M(B|C|P|U)[0-9]{3})|(XPD(B|C))[0-9]{1}|(DS|KS|EU|KC|KD)[0-9]{3}))',
      'i',
    );
    const quantityRegex = new RegExp('^[0-9]+[, | .]*[0-9]*');

    if (!materialNumberRegex.test(materialNumber)) {
      return false;
    }

    if (!batchRegex.test(batch)) {
      return false;
    }

    if (!quantityRegex.test(quantityString)) {
      return false;
    }

    return true;
  }

  validatePalletLabel(barcode: string): boolean {
    const ssccRegex = new RegExp('^[0]*5201409000[0-9]{7}');

    if (!ssccRegex.test(barcode)) {
      return false;
    }

    return true;
  }
}

export default new BarcodeValidator();
