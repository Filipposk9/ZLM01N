import {Material} from '../../../src/shared/Types';
import {SCHEMA_NAME} from '../SchemaName';
import BaseDao from './BaseDao';

class MaterialDao {
  async getMaterialBasicData(
    materialNumber: string,
  ): Promise<Material | undefined> {
    const materialBasicData = await BaseDao.getCopyObjectById<Material>(
      SCHEMA_NAME.MATERIAL,
      materialNumber,
    );

    if (!materialBasicData) {
      return undefined;
    }

    return materialBasicData;
  }

  async createMaterial(material: Material) {
    BaseDao.createObject(SCHEMA_NAME.MATERIAL, material);
  }
}

export default new MaterialDao();
