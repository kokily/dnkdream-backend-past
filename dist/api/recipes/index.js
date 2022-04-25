"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var koa_router_1 = __importDefault(require("koa-router"));
var authorized_1 = __importDefault(require("../../libs/middlewares/authorized"));
var addRecipeContent_1 = __importDefault(require("./addRecipeContent"));
var initRecipe_1 = __importDefault(require("./initRecipe"));
var listRecipes_1 = __importDefault(require("./listRecipes"));
var readRecipe_1 = __importDefault(require("./readRecipe"));
var removeRecipe_1 = __importDefault(require("./removeRecipe"));
var recipes = new koa_router_1.default();
recipes.post('/', authorized_1.default, initRecipe_1.default);
recipes.get('/', authorized_1.default, listRecipes_1.default);
recipes.get('/:id', authorized_1.default, readRecipe_1.default);
recipes.delete('/:id', authorized_1.default, removeRecipe_1.default);
recipes.patch('/:id', authorized_1.default, addRecipeContent_1.default);
exports.default = recipes;
