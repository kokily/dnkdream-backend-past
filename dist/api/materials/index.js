"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var koa_router_1 = __importDefault(require("koa-router"));
var authorized_1 = __importDefault(require("../../libs/middlewares/authorized"));
var addMaterial_1 = __importDefault(require("./addMaterial"));
var listMaterials_1 = __importDefault(require("./listMaterials"));
var readMaterial_1 = __importDefault(require("./readMaterial"));
var removeMaterial_1 = __importDefault(require("./removeMaterial"));
var updateMaterial_1 = __importDefault(require("./updateMaterial"));
var materials = new koa_router_1.default();
materials.post('/', authorized_1.default, addMaterial_1.default);
materials.get('/', authorized_1.default, listMaterials_1.default);
materials.get('/:id', authorized_1.default, readMaterial_1.default);
materials.delete('/:id', authorized_1.default, removeMaterial_1.default);
materials.patch('/:id', authorized_1.default, updateMaterial_1.default);
exports.default = materials;
