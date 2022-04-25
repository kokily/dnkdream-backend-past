"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const authorized_1 = __importDefault(require("../../libs/middlewares/authorized"));
const addMaterial_1 = __importDefault(require("./addMaterial"));
const listMaterials_1 = __importDefault(require("./listMaterials"));
const readMaterial_1 = __importDefault(require("./readMaterial"));
const removeMaterial_1 = __importDefault(require("./removeMaterial"));
const updateMaterial_1 = __importDefault(require("./updateMaterial"));
const materials = new koa_router_1.default();
materials.post('/', authorized_1.default, addMaterial_1.default);
materials.get('/', authorized_1.default, listMaterials_1.default);
materials.get('/:id', authorized_1.default, readMaterial_1.default);
materials.delete('/:id', authorized_1.default, removeMaterial_1.default);
materials.patch('/:id', authorized_1.default, updateMaterial_1.default);
exports.default = materials;
