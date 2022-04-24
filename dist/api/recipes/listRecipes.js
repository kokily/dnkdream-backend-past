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
const Recipe_1 = require("../../entities/Recipe");
const loadUser_1 = __importDefault(require("../../libs/loadUser"));
const server_1 = require("../../server");
function listRecipesAPI(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const { title, cursor } = ctx.query;
        try {
            const user_id = (0, loadUser_1.default)(ctx);
            const recipeRepo = yield server_1.dataSource.getRepository(Recipe_1.Recipe);
            const query = recipeRepo
                .createQueryBuilder('recipes')
                .where('recipes.user_id = :user_id', { user_id })
                .limit(20)
                .orderBy('recipes.created_at', 'DESC');
            if (title) {
                query.andWhere('recipes.title like :title', { title: `%${title}%` });
            }
            if (cursor) {
                const recipe = yield recipeRepo.findOneBy({ id: cursor });
                if (!recipe) {
                    ctx.status = 404;
                    ctx.body = '해당 레시피가 존재하지 않습니다.';
                    return;
                }
                query.andWhere('recipes.created_at < :date', {
                    date: recipe.created_at,
                });
                query.orWhere('recipes.created_at = :date AND recipes.id < :id', {
                    date: recipe.created_at,
                    id: recipe.id,
                });
            }
            const recipes = yield query.getMany();
            ctx.body = recipes;
        }
        catch (err) {
            ctx.throw(500, err);
        }
    });
}
exports.default = listRecipesAPI;
