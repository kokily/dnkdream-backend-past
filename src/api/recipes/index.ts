import Router from 'koa-router';
import authorized from '../../libs/middlewares/authorized';
import addCostRecipeAPI from './addCostRecipeAPI';
import addRecipeContentAPI from './addRecipeContent';
import changeThumbnailAPI from './changeThumbnail';
import initRecipeAPI from './initRecipe';
import listRecipesAPI from './listRecipes';
import readRecipeAPI from './readRecipe';
import removeRecipeAPI from './removeRecipe';

const recipes = new Router();

recipes.patch('/cost/:id', authorized, addCostRecipeAPI);
recipes.patch('/:id', authorized, addRecipeContentAPI);
recipes.patch('/thumbnail/:id', authorized, changeThumbnailAPI);
recipes.post('/', authorized, initRecipeAPI);
recipes.get('/', authorized, listRecipesAPI);
recipes.get('/:id', authorized, readRecipeAPI);
recipes.delete('/:id', authorized, removeRecipeAPI);

export default recipes;
