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
var decodeToken_1 = __importDefault(require("./decodeToken"));
var generateToken_1 = __importDefault(require("./generateToken"));
var setCookies_1 = __importDefault(require("./setCookies"));
var Token_1 = require("../../entities/Token");
var User_1 = require("../../entities/User");
var server_1 = require("../../server");
function tokenRefresh(ctx, prevRefreshToken) {
    return __awaiter(this, void 0, void 0, function () {
        var decoded, tokenRepo, user, now, diff, refreshToken, accessToken, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 8, , 9]);
                    return [4 /*yield*/, (0, decodeToken_1.default)(prevRefreshToken)];
                case 1:
                    decoded = _a.sent();
                    return [4 /*yield*/, server_1.dataSource.getRepository(Token_1.Token)];
                case 2:
                    tokenRepo = _a.sent();
                    return [4 /*yield*/, server_1.dataSource.getRepository(User_1.User).findOneBy({ id: decoded.user_id })];
                case 3:
                    user = _a.sent();
                    if (!user) {
                        ctx.throw(500, 'Invalid User Error');
                    }
                    now = new Date().getTime();
                    diff = decoded.exp * 1000 - now;
                    refreshToken = prevRefreshToken;
                    if (!(diff < 1000 * 60 * 60 * 24 * 15)) return [3 /*break*/, 5];
                    return [4 /*yield*/, (0, generateToken_1.default)({
                            user_id: user.id,
                            username: user.username,
                            token_id: decoded.token_id,
                        }, { subject: 'refresh_token', expiresIn: '15d' })];
                case 4:
                    refreshToken = _a.sent();
                    _a.label = 5;
                case 5: return [4 /*yield*/, (0, generateToken_1.default)({ user_id: user.id, username: user.username }, { subject: 'access_token', expiresIn: '15m' })];
                case 6:
                    accessToken = _a.sent();
                    (0, setCookies_1.default)(ctx, { accessToken: accessToken, refreshToken: refreshToken });
                    return [4 /*yield*/, tokenRepo.update({ id: decoded.token_id }, { token: refreshToken })];
                case 7:
                    _a.sent();
                    return [2 /*return*/, decoded.user_id];
                case 8:
                    err_1 = _a.sent();
                    ctx.throw(500, err_1);
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    });
}
exports.default = tokenRefresh;
