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
const Recipe_1 = require("../../entities/Recipe");
const server_1 = require("../../server");
function addCostRecipeAPI(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = ctx.params;
        const schema = joi_1.default.object().keys({
            all_price: joi_1.default.number().required(),
        });
        if (!(0, utils_1.validateBody)(ctx, schema))
            return;
        const { all_price } = ctx.request.body;
        try {
            const recipeRepo = yield server_1.dataSource.getRepository(Recipe_1.Recipe);
            yield recipeRepo.update({ id }, { all_price });
            ctx.status = 200;
        }
        catch (err) {
            ctx.throw(500, err);
        }
    });
}
exports.default = addCostRecipeAPI;
