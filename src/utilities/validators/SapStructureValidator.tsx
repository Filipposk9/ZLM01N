class SapStructureValidator {
  validateOutboundDelivery(outboundDeliveryNumber: string): boolean {
    const outboundDeliveryRegex = new RegExp('^80[0-9]{6}$');

    return outboundDeliveryRegex.test(outboundDeliveryNumber);
  }

  validateProductionOrder(productionOrder: string): boolean {
    const productionOrderRegex = new RegExp('^1[0-9]{6}$');

    return productionOrderRegex.test(productionOrder);
  }

  validateTank(tank: string): boolean {
    const tankRegex = new RegExp(
      '^((BS(A|B|C|D|E)[0-9]{2})|(C(B|I|P|S|T|U|X|Y)[0-9]{3})|(M(B|C|P|U)[0-9]{3})|(XPD(B|C))[0-9]{1}|(DS|KS|EU|KC|KD)[0-9]{3})$',
      'i',
    );

    return tankRegex.test(tank);
  }
}

export default new SapStructureValidator();
