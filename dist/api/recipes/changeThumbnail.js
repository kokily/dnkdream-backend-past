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
const joi_1 = __importDefault(require("joi"));
const loadUser_1 = __importDefault(require("../../libs/loadUser"));
const utils_1 = require("../../libs/utils");
const Recipe_1 = require("../../entities/Recipe");
const server_1 = require("../../server");
function changeThumbnailAPI(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = ctx.params;
        const schema = joi_1.default.object().keys({
            thumbnail: joi_1.default.string().required(),
        });
        if (!(0, utils_1.validateBody)(ctx, schema))
            return;
        const { thumbnail } = ctx.request.body;
        try {
            const user_id = yield (0, loadUser_1.default)(ctx);
            const recipeRepo = yield server_1.dataSource.getRepository(Recipe_1.Recipe);
            const recipe = yield recipeRepo.findOneBy({ id });
            if (!recipe) {
                ctx.status = 404;
                ctx.body = '해당 레시피가 존재하지 않습니다.';
                return;
            }
            if (recipe.fk_user_id !== user_id) {
                ctx.status = 403;
                ctx.body = '해당 레시피의 수정 권한을 갖고 있지 않습니다.';
                return;
            }
            yield recipeRepo.update({ id }, { thumbnail });
            ctx.status = 200;
        }
        catch (err) {
            ctx.throw(500, err);
        }
    });
}
exports.default = changeThumbnailAPI;
