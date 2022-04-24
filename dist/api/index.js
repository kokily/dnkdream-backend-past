"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const auth_1 = __importDefault(require("./auth"));
const materials_1 = __importDefault(require("./materials"));
const recipes_1 = __importDefault(require("./recipes"));
const upload_1 = __importDefault(require("./upload"));
const api = new koa_router_1.default();
api.use('/auth', auth_1.default.routes());
api.use('/materials', materials_1.default.routes());
api.use('/recipes', recipes_1.default.routes());
api.use('/upload', upload_1.default.routes());
exports.default = api;
