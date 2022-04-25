"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var koa_router_1 = __importDefault(require("koa-router"));
var authorized_1 = __importDefault(require("../../libs/middlewares/authorized"));
var image_1 = __importDefault(require("./image"));
var upload = new koa_router_1.default();
upload.post('/', authorized_1.default, image_1.default);
exports.default = upload;
