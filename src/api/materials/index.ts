import Router from 'koa-router';
import authorized from '../../libs/middlewares/authorized';
import addMaterialAPI from './addMaterial';
import listMaterialsAPI from './listMaterials';
import readMaterialAPI from './readMaterial';
import removeMaterialAPI from './removeMaterial';
import updateMaterialAPI from './updateMaterial';

const materials = new Router();

materials.post('/', authorized, addMaterialAPI);
materials.get('/', authorized, listMaterialsAPI);
materials.get('/:id', authorized, readMaterialAPI);
materials.delete('/:id', authorized, removeMaterialAPI);
materials.patch('/:id', authorized, updateMaterialAPI);

export default materials;
