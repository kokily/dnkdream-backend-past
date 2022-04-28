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
Object.defineProperty(exports, "__esModule", { value: true });
const Recipe_1 = require("../../entities/Recipe");
const server_1 = require("../../server");
function readRecipeAPI(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = ctx.params;
        try {
            const recipeRepo = yield server_1.dataSource.getRepository(Recipe_1.Recipe);
            const recipe = yield recipeRepo
                .createQueryBuilder('recipe')
                .leftJoinAndSelect('recipe.materials', 'id')
                .where('recipe.id = :id', { id })
                .getOne();
            if (!recipe) {
                ctx.status = 404;
                ctx.body = '해당 레시피가 존재하지 않습니다.';
                return;
            }
            ctx.body = recipe;
        }
        catch (err) {
            ctx.throw(500, err);
        }
    });
}
exports.default = readRecipeAPI;
