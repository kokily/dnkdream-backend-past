"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var koa_router_1 = __importDefault(require("koa-router"));
var check_1 = __importDefault(require("./check"));
var login_1 = __importDefault(require("./login"));
var logout_1 = __importDefault(require("./logout"));
var register_1 = __importDefault(require("./register"));
var auth = new koa_router_1.default();
auth.get('/check', check_1.default);
auth.post('/login', login_1.default);
auth.post('/logout', logout_1.default);
auth.post('/register', register_1.default);
exports.default = auth;
