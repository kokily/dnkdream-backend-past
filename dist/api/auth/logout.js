"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const setCookies_1 = __importDefault(require("../../libs/tokens/setCookies"));
const Token_1 = require("../../entities/Token");
const User_1 = require("../../entities/User");
const server_1 = require("../../server");
function logoutAPI(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { user_id } = ctx.state.user;
            const userRepo = yield server_1.dataSource.getRepository(User_1.User);
            const tokenRepo = yield server_1.dataSource.getRepository(Token_1.Token);
            const user = yield userRepo.findOneBy({ id: user_id });
            if (!user) {
                ctx.status = 403;
                ctx.body = '로그인 후 이용하세요';
                return;
            }
            const token = yield tokenRepo.findOneBy({ fk_user_id: user.id });
            if (!token) {
                ctx.status = 403;
                ctx.body = '토큰 미 발행';
                return;
            }
            (0, setCookies_1.default)(ctx);
            ctx.state.user = undefined;
            yield tokenRepo.delete(token.id);
            ctx.status = 204;
        }
        catch (err) {
            ctx.throw(500, err);
        }
    });
}
exports.default = logoutAPI;
