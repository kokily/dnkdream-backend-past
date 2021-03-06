"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_router_1 = __importDefault(require("koa-router"));
const koa_logger_1 = __importDefault(require("koa-logger"));
const koa_body_1 = __importDefault(require("koa-body"));
const cors_1 = __importDefault(require("./libs/middlewares/cors"));
const jwtMiddleware_1 = __importDefault(require("./libs/middlewares/jwtMiddleware"));
const api_1 = __importDefault(require("./api"));
const app = new koa_1.default();
const router = new koa_router_1.default();
app.use(cors_1.default);
app.use((0, koa_logger_1.default)());
app.use(jwtMiddleware_1.default);
app.use((0, koa_body_1.default)({ multipart: true }));
app.use(router.routes());
app.use(router.allowedMethods());
router.use('/api', api_1.default.routes());
exports.default = app;
