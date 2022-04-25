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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const joi_1 = __importDefault(require("joi"));
const utils_1 = require("../../libs/utils");
const createToken_1 = __importDefault(require("../../libs/tokens/createToken"));
const setCookies_1 = __importDefault(require("../../libs/tokens/setCookies"));
const User_1 = require("../../entities/User");
const Token_1 = require("../../entities/Token");
const server_1 = require("../../server");
function loginAPI(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const schema = joi_1.default.object().keys({
            username: joi_1.default.string().required(),
            password: joi_1.default.string().required(),
        });
        if (!(0, utils_1.validateBody)(ctx, schema))
            return;
        const { username, password } = ctx.request.body;
        try {
            const userRepo = yield server_1.dataSource.getRepository(User_1.User);
            const tokenRepo = yield server_1.dataSource.getRepository(Token_1.Token);
            const user = yield userRepo.findOneBy({ username });
            if (!user) {
                ctx.status = 404;
                ctx.body = '회원가입 후 이용하세요.';
                return;
            }
            const valid = yield bcryptjs_1.default.compare(password, user.password);
            if (!valid) {
                ctx.status = 401;
                ctx.body = '비밀번호가 틀렸습니다.';
                return;
            }
            const prevToken = yield tokenRepo.findOneBy({ fk_user_id: user.id });
            if (prevToken) {
                yield tokenRepo.delete({ fk_user_id: user.id });
            }
            const tokens = yield (0, createToken_1.default)(user);
            (0, setCookies_1.default)(ctx, tokens);
            ctx.body = {
                user_id: user.id,
                username: user.username,
            };
        }
        catch (err) {
            ctx.throw(500, err);
        }
    });
}
exports.default = loginAPI;
