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
const utils_1 = require("../../libs/utils");
const Material_1 = require("../../entities/Material");
const Recipe_1 = require("../../entities/Recipe");
const server_1 = require("../../server");
function addMaterialAPI(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const schema = joi_1.default.object().keys({
            recipe_id: joi_1.default.string().required(),
            name: joi_1.default.string().required(),
            divide: joi_1.default.string().required(),
            unit: joi_1.default.string().required(),
            usage: joi_1.default.number().required(),
            price: joi_1.default.number().required(),
            cost: joi_1.default.number().required(),
        });
        if (!(0, utils_1.validateBody)(ctx, schema))
            return;
        const { recipe_id, name, divide, unit, usage, price, cost } = ctx.request.body;
        try {
            const recipeRepo = yield server_1.dataSource.getRepository(Recipe_1.Recipe);
            const materialRepo = yield server_1.dataSource.getRepository(Material_1.Material);
            const recipe = yield recipeRepo.findOneBy({ id: recipe_id });
            if (!recipe) {
                ctx.status = 404;
                ctx.body = '해당 레시피가 존재하지 않습니다.';
                return;
            }
            const material = new Material_1.Material();
            material.name = name;
            material.divide = divide;
            material.unit = unit;
            material.usage = usage;
            material.price = price;
            material.cost = cost;
            material.fk_recipe_id = recipe_id;
            yield materialRepo.save(material);
            ctx.body = material;
        }
        catch (err) {
            ctx.throw(500, err);
        }
    });
}
exports.default = addMaterialAPI;
