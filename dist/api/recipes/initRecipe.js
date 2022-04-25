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
const Recipe_1 = require("../../entities/Recipe");
const utils_1 = require("../../libs/utils");
const server_1 = require("../../server");
const loadUser_1 = __importDefault(require("../../libs/loadUser"));
function initRecipeAPI(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const schema = joi_1.default.object().keys({
            title: joi_1.default.string().required(),
            serving: joi_1.default.string().required(),
            thumbnail: joi_1.default.string().required(),
        });
        if (!(0, utils_1.validateBody)(ctx, schema))
            return;
        const { title, serving, thumbnail } = ctx.request.body;
        try {
            const user_id = yield (0, loadUser_1.default)(ctx);
            const recipeRepo = yield server_1.dataSource.getRepository(Recipe_1.Recipe);
            const recipe = new Recipe_1.Recipe();
            recipe.title = title;
            recipe.serving = serving;
            recipe.thumbnail = thumbnail;
            recipe.fk_user_id = user_id;
            yield recipeRepo.save(recipe);
            ctx.body = recipe;
        }
        catch (err) {
            ctx.throw(500, err);
        }
    });
}
exports.default = initRecipeAPI;
