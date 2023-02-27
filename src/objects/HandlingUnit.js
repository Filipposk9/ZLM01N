class HandlingUnit {
  constructor(data) {
    this.exidv = data[0].EXIDV;
    this.venum = data[0].VENUM;
    this.vepos = data[0].VEPOS;
    this.charg = data[0].CHARG;
    this.lgort = data[0].LGORT;
    this.matnr = data[0].MATNR;
    this.vemeh = data[0].VEMEH;
    this.vemng = data[0].VEMNG;
  }
}

export default HandlingUnit;
