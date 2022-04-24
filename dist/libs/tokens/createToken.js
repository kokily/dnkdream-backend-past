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
const server_1 = require("../../server");
const Token_1 = require("../../entities/Token");
const generateToken_1 = __importDefault(require("./generateToken"));
function createToken(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const tokenRepo = yield server_1.dataSource.getRepository(Token_1.Token);
        const token = new Token_1.Token();
        token.fk_user_id = user.id;
        yield tokenRepo.save(token);
        const accessToken = yield (0, generateToken_1.default)({ user_id: user.id, username: user.username }, { subject: 'access_token', expiresIn: '15m' });
        const refreshToken = yield (0, generateToken_1.default)({
            user_id: user.id,
            username: user.username,
            token_id: token.id,
        }, { subject: 'refresh_token', expiresIn: '15d' });
        token.token = refreshToken;
        yield tokenRepo.save(token);
        return { accessToken, refreshToken };
    });
}
exports.default = createToken;
