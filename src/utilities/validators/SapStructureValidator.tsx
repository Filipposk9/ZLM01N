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
    const tankRegex = new RegExp('^(BS|CB|CP|CS|CU|CY|DS)[0-9]{3}$', 'i');

    return tankRegex.test(tank);
  }
}

export default new SapStructureValidator();
