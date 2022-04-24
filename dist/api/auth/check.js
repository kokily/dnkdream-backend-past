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
Object.defineProperty(exports, "__esModule", { value: true });
const Token_1 = require("../../entities/Token");
const User_1 = require("../../entities/User");
const server_1 = require("../../server");
function checkAPI(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { user_id } = ctx.state.user;
            if (!user_id) {
                ctx.throw(403, '로그인 후 사용하세요.');
            }
            const userRepo = yield server_1.dataSource.getRepository(User_1.User);
            const tokenRepo = yield server_1.dataSource.getRepository(Token_1.Token);
            const user = yield userRepo.findOneBy({ id: user_id });
            if (!user) {
                ctx.status = 404;
                ctx.body = '존재하지 않는 아이디입니다.';
                return;
            }
            const token = yield tokenRepo.findOneBy({ fk_user_id: user.id });
            if (!token) {
                ctx.status = 403;
                ctx.body = '토큰 미 발행';
                return;
            }
            ctx.body = {
                user_id,
                username: user.username,
            };
        }
        catch (err) {
            ctx.throw(500, err);
        }
    });
}
exports.default = checkAPI;
