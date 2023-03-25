class SapStructureValidator {
  validateOutboundDelivery(outboundDeliveryNumber: string): boolean {
    const outboundDeliveryRegex = new RegExp('^80[0-9]{6}$');

    return outboundDeliveryRegex.test(outboundDeliveryNumber);
  }

  validateProductionOrder(productionOrder: string): boolean {
    const productionOrderRegex = new RegExp('^1[0-9]{6}$');

    return productionOrderRegex.test(productionOrder);
  }
}

export default new SapStructureValidator();
