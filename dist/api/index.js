"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var koa_router_1 = __importDefault(require("koa-router"));
var auth_1 = __importDefault(require("./auth"));
var materials_1 = __importDefault(require("./materials"));
var recipes_1 = __importDefault(require("./recipes"));
var upload_1 = __importDefault(require("./upload"));
var api = new koa_router_1.default();
api.use('/auth', auth_1.default.routes());
api.use('/materials', materials_1.default.routes());
api.use('/recipes', recipes_1.default.routes());
api.use('/upload', upload_1.default.routes());
exports.default = api;
