class GoodsMovementLog {
  lineItems = new Array();

  constructor(lines) {
    this.header = new GoodsMovementLogHeader();

    if (lines) {
      lines.map(line => {
        this.lineItems.push(new GoodsMovementLogItem(line));
      });
    }
  }
}

class GoodsMovementLogHeader {
  static counter = 0;

  constructor() {
    this.key = GoodsMovementLogHeader.counter;
    GoodsMovementLogHeader.counter++;
  }
}

class GoodsMovementLogItem {
  constructor(data) {
    this.count = data.COUNT;
    this.mblnr = data.MBLNR;
    this.matnr = data.MATNR;
    this.maktx = data.MAKTX;
    this.charg = data.CHARG;
    this.menge = data.MENGE;
    this.lgortIn = data.LGORT_IN;
    this.lgortOut = data.LGORT_OUT;
    this.validity = data.VALIDITY;
  }
}

export default GoodsMovementLog;
