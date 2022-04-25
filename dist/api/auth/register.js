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
const User_1 = require("../../entities/User");
const server_1 = require("../../server");
function registerAPI(ctx) {
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
            const exists = yield userRepo.findOneBy({ username });
            if (exists) {
                ctx.status = 409;
                ctx.body = '이미 존재하는 아이디입니다.';
                return;
            }
            const user = new User_1.User();
            user.username = username;
            user.password = yield bcryptjs_1.default.hash(password, 10);
            yield userRepo.save(user);
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
exports.default = registerAPI;
