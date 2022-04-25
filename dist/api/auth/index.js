"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const check_1 = __importDefault(require("./check"));
const login_1 = __importDefault(require("./login"));
const logout_1 = __importDefault(require("./logout"));
const register_1 = __importDefault(require("./register"));
const auth = new koa_router_1.default();
auth.get('/check', check_1.default);
auth.post('/login', login_1.default);
auth.post('/logout', logout_1.default);
auth.post('/register', register_1.default);
exports.default = auth;
