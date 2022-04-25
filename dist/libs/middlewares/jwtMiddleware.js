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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var decodeToken_1 = __importDefault(require("../tokens/decodeToken"));
var tokenRefresh_1 = __importDefault(require("../tokens/tokenRefresh"));
var server_1 = require("../../server");
var Token_1 = require("../../entities/Token");
var User_1 = require("../../entities/User");
var createToken_1 = __importDefault(require("../tokens/createToken"));
var setCookies_1 = __importDefault(require("../tokens/setCookies"));
var jwtMiddleware = function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    var tokenRepo, userRepo, accessToken, refreshToken, refreshTokenData, diff, accessTokenData, refreshTokenData, user, tokens, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, server_1.dataSource.getRepository(Token_1.Token)];
            case 1:
                tokenRepo = _a.sent();
                return [4 /*yield*/, server_1.dataSource.getRepository(User_1.User)];
            case 2:
                userRepo = _a.sent();
                accessToken = ctx.cookies.get('access_token');
                refreshToken = ctx.cookies.get('refresh_token');
                // 두 토큰이 없을 경우
                if (!accessToken && !refreshToken) {
                    ctx.state.user = undefined;
                    console.log('토큰 없음');
                    return [2 /*return*/, next()];
                }
                _a.label = 3;
            case 3:
                _a.trys.push([3, 15, , 16]);
                if (!((accessToken && refreshToken) || (!accessToken && refreshToken))) return [3 /*break*/, 7];
                return [4 /*yield*/, (0, decodeToken_1.default)(refreshToken)];
            case 4:
                refreshTokenData = _a.sent();
                diff = refreshTokenData.exp * 1000 - new Date().getTime();
                if (!(diff < 1000 * 60 * 30 || !accessToken)) return [3 /*break*/, 6];
                return [4 /*yield*/, (0, tokenRefresh_1.default)(ctx, refreshToken)];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6:
                ctx.state.user = {
                    user_id: refreshTokenData.user_id,
                    username: refreshTokenData.username,
                };
                return [2 /*return*/, next()];
            case 7:
                if (!(accessToken && !refreshToken)) return [3 /*break*/, 14];
                return [4 /*yield*/, (0, decodeToken_1.default)(accessToken)];
            case 8:
                accessTokenData = _a.sent();
                return [4 /*yield*/, tokenRepo.findOneBy({
                        fk_user_id: accessTokenData.user_id,
                    })];
            case 9:
                refreshTokenData = _a.sent();
                if (!refreshTokenData) return [3 /*break*/, 11];
                return [4 /*yield*/, tokenRepo.delete({ fk_user_id: accessTokenData.user_id })];
            case 10:
                _a.sent();
                _a.label = 11;
            case 11: return [4 /*yield*/, userRepo.findOneBy({ id: accessTokenData.user_id })];
            case 12:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, next()];
                }
                return [4 /*yield*/, (0, createToken_1.default)(user)];
            case 13:
                tokens = _a.sent();
                (0, setCookies_1.default)(ctx, tokens);
                ctx.state.user = {
                    user_id: accessTokenData.user_id,
                    username: accessTokenData.username,
                };
                return [2 /*return*/, next()];
            case 14: return [3 /*break*/, 16];
            case 15:
                err_1 = _a.sent();
                console.error(err_1);
                return [2 /*return*/, next()];
            case 16: return [2 /*return*/];
        }
    });
}); };
exports.default = jwtMiddleware;
