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
const User_1 = require("../../entities/User");
const server_1 = require("../../server");
const authorized = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepo = yield server_1.dataSource.getRepository(User_1.User);
    if (!ctx.state.user) {
        ctx.status = 401;
        ctx.body = '로그인 후 이용해 주세요';
        return;
    }
    const user = yield userRepo.findOneBy({ id: ctx.state.user.user_id });
    if (!user) {
        ctx.status = 401;
        ctx.body = '로그인 후 이용해 주세요';
        return;
    }
    return next();
});
exports.default = authorized;
