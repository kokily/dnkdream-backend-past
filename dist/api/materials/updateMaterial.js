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
const Material_1 = require("../../entities/Material");
const Recipe_1 = require("../../entities/Recipe");
const server_1 = require("../../server");
function updateMaterialAPI(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = ctx.params;
        const schema = joi_1.default.object().keys({
            name: joi_1.default.string().required(),
            divide: joi_1.default.string().required(),
            unit: joi_1.default.string().required(),
            usage: joi_1.default.number().required(),
            price: joi_1.default.number().required(),
            cost: joi_1.default.number().required(),
        });
        if (!(0, utils_1.validateBody)(ctx, schema))
            return;
        const { name, divide, unit, usage, price, cost } = ctx.request.body;
        try {
            const user_id = yield (0, loadUser_1.default)(ctx);
            const recipeRepo = yield server_1.dataSource.getRepository(Recipe_1.Recipe);
            const materialRepo = yield server_1.dataSource.getRepository(Material_1.Material);
            const material = yield materialRepo.findOneBy({ id });
            if (!material) {
                ctx.status = 404;
                ctx.body = '?????? ???????????? ???????????? ????????????.';
                return;
            }
            const recipe = yield recipeRepo.findOneBy({ id: material.fk_recipe_id });
            if (!recipe) {
                ctx.status = 404;
                ctx.body = '?????? ???????????? ???????????? ????????????.';
                return;
            }
            if (recipe.fk_user_id !== user_id) {
                ctx.status = 403;
                ctx.body = '?????? ???????????? ???????????? ????????????.';
                return;
            }
            yield materialRepo.update({ id }, {
                name,
                divide,
                unit,
                usage,
                price,
                cost,
                updated_at: new Date(),
            });
            ctx.status = 200;
        }
        catch (err) {
            ctx.throw(500, err);
        }
    });
}
exports.default = updateMaterialAPI;
