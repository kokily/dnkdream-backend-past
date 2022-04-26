"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const authorized_1 = __importDefault(require("../../libs/middlewares/authorized"));
const imageUpload_1 = __importDefault(require("./imageUpload"));
const upload = new koa_router_1.default();
upload.post('/', authorized_1.default, imageUpload_1.default);
exports.default = upload;
