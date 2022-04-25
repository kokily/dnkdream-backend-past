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
const decodeToken_1 = __importDefault(require("./decodeToken"));
const generateToken_1 = __importDefault(require("./generateToken"));
const setCookies_1 = __importDefault(require("./setCookies"));
const Token_1 = require("../../entities/Token");
const User_1 = require("../../entities/User");
const server_1 = require("../../server");
function tokenRefresh(ctx, prevRefreshToken) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const decoded = yield (0, decodeToken_1.default)(prevRefreshToken);
            const tokenRepo = yield server_1.dataSource.getRepository(Token_1.Token);
            const user = yield server_1.dataSource.getRepository(User_1.User).findOneBy({ id: decoded.user_id });
            if (!user) {
                ctx.throw(500, 'Invalid User Error');
            }
            const now = new Date().getTime();
            const diff = decoded.exp * 1000 - now;
            let refreshToken = prevRefreshToken;
            if (diff < 1000 * 60 * 60 * 24 * 15) {
                refreshToken = yield (0, generateToken_1.default)({
                    user_id: user.id,
                    username: user.username,
                    token_id: decoded.token_id,
                }, { subject: 'refresh_token', expiresIn: '15d' });
            }
            const accessToken = yield (0, generateToken_1.default)({ user_id: user.id, username: user.username }, { subject: 'access_token', expiresIn: '15m' });
            (0, setCookies_1.default)(ctx, { accessToken, refreshToken });
            yield tokenRepo.update({ id: decoded.token_id }, { token: refreshToken });
            return decoded.user_id;
        }
        catch (err) {
            ctx.throw(500, err);
        }
    });
}
exports.default = tokenRefresh;
