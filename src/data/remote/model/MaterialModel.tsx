export interface MaterialModel {
  MATERIALNUMBER: string;
  DESCRIPTION: string;
  MATERIALGROUP: string;
  UNITOFMEASURE: string;
}

export interface MaterialResponse {
  data: MaterialModel[];
}
