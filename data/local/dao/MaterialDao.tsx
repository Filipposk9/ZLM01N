import {MaterialSchema} from '../schema/MaterialSchema';

class MaterialDao {
  async getMaterialTextByNumber(
    materialNumber: string,
  ): Promise<MaterialSchema | undefined> {}
}
