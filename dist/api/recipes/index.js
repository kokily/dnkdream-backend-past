"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const authorized_1 = __importDefault(require("../../libs/middlewares/authorized"));
const addRecipeContent_1 = __importDefault(require("./addRecipeContent"));
const initRecipe_1 = __importDefault(require("./initRecipe"));
const listRecipes_1 = __importDefault(require("./listRecipes"));
const readRecipe_1 = __importDefault(require("./readRecipe"));
const removeRecipe_1 = __importDefault(require("./removeRecipe"));
const recipes = new koa_router_1.default();
recipes.post('/', authorized_1.default, initRecipe_1.default);
recipes.get('/', authorized_1.default, listRecipes_1.default);
recipes.get('/:id', authorized_1.default, readRecipe_1.default);
recipes.delete('/:id', authorized_1.default, removeRecipe_1.default);
recipes.patch('/:id', authorized_1.default, addRecipeContent_1.default);
exports.default = recipes;
