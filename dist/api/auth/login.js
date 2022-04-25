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
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var joi_1 = __importDefault(require("joi"));
var utils_1 = require("../../libs/utils");
var createToken_1 = __importDefault(require("../../libs/tokens/createToken"));
var setCookies_1 = __importDefault(require("../../libs/tokens/setCookies"));
var User_1 = require("../../entities/User");
var Token_1 = require("../../entities/Token");
var server_1 = require("../../server");
function loginAPI(ctx) {
    return __awaiter(this, void 0, void 0, function () {
        var schema, _a, username, password, userRepo, tokenRepo, user, valid, prevToken, tokens, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    schema = joi_1.default.object().keys({
                        username: joi_1.default.string().required(),
                        password: joi_1.default.string().required(),
                    });
                    if (!(0, utils_1.validateBody)(ctx, schema))
                        return [2 /*return*/];
                    _a = ctx.request.body, username = _a.username, password = _a.password;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 10, , 11]);
                    return [4 /*yield*/, server_1.dataSource.getRepository(User_1.User)];
                case 2:
                    userRepo = _b.sent();
                    return [4 /*yield*/, server_1.dataSource.getRepository(Token_1.Token)];
                case 3:
                    tokenRepo = _b.sent();
                    return [4 /*yield*/, userRepo.findOneBy({ username: username })];
                case 4:
                    user = _b.sent();
                    if (!user) {
                        ctx.status = 404;
                        ctx.body = '회원가입 후 이용하세요.';
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, bcryptjs_1.default.compare(password, user.password)];
                case 5:
                    valid = _b.sent();
                    if (!valid) {
                        ctx.status = 401;
                        ctx.body = '비밀번호가 틀렸습니다.';
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, tokenRepo.findOneBy({ fk_user_id: user.id })];
                case 6:
                    prevToken = _b.sent();
                    if (!prevToken) return [3 /*break*/, 8];
                    return [4 /*yield*/, tokenRepo.delete({ fk_user_id: user.id })];
                case 7:
                    _b.sent();
                    _b.label = 8;
                case 8: return [4 /*yield*/, (0, createToken_1.default)(user)];
                case 9:
                    tokens = _b.sent();
                    (0, setCookies_1.default)(ctx, tokens);
                    ctx.body = {
                        user_id: user.id,
                        username: user.username,
                    };
                    return [3 /*break*/, 11];
                case 10:
                    err_1 = _b.sent();
                    ctx.throw(500, err_1);
                    return [3 /*break*/, 11];
                case 11: return [2 /*return*/];
            }
        });
    });
}
exports.default = loginAPI;
