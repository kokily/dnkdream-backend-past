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
const decodeToken_1 = __importDefault(require("../tokens/decodeToken"));
const tokenRefresh_1 = __importDefault(require("../tokens/tokenRefresh"));
const server_1 = require("../../server");
const Token_1 = require("../../entities/Token");
const User_1 = require("../../entities/User");
const createToken_1 = __importDefault(require("../tokens/createToken"));
const setCookies_1 = __importDefault(require("../tokens/setCookies"));
const jwtMiddleware = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenRepo = yield server_1.dataSource.getRepository(Token_1.Token);
    const userRepo = yield server_1.dataSource.getRepository(User_1.User);
    let accessToken = ctx.cookies.get('access_token');
    let refreshToken = ctx.cookies.get('refresh_token');
    // 두 토큰이 없을 경우
    if (!accessToken && !refreshToken) {
        ctx.state.user = undefined;
        console.log('토큰 없음');
        return next();
    }
    try {
        if ((accessToken && refreshToken) || (!accessToken && refreshToken)) {
            // 두 토큰 다 있거나 Refresh Token이 있을 경우 디코딩 후 리프레쉬
            const refreshTokenData = yield (0, decodeToken_1.default)(refreshToken);
            const diff = refreshTokenData.exp * 1000 - new Date().getTime();
            if (diff < 1000 * 60 * 30 || !accessToken) {
                yield (0, tokenRefresh_1.default)(ctx, refreshToken);
            }
            ctx.state.user = {
                user_id: refreshTokenData.user_id,
                username: refreshTokenData.username,
            };
            return next();
        }
        else if (accessToken && !refreshToken) {
            // Access Token 유효, Refresh Token 만료
            const accessTokenData = yield (0, decodeToken_1.default)(accessToken);
            const refreshTokenData = yield tokenRepo.findOneBy({
                fk_user_id: accessTokenData.user_id,
            });
            if (refreshTokenData) {
                yield tokenRepo.delete({ fk_user_id: accessTokenData.user_id });
            }
            const user = yield userRepo.findOneBy({ id: accessTokenData.user_id });
            if (!user) {
                return next();
            }
            const tokens = yield (0, createToken_1.default)(user);
            (0, setCookies_1.default)(ctx, tokens);
            ctx.state.user = {
                user_id: accessTokenData.user_id,
                username: accessTokenData.username,
            };
            return next();
        }
    }
    catch (err) {
        console.error(err);
        return next();
    }
});
exports.default = jwtMiddleware;
