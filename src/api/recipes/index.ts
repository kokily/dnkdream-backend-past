import Router from 'koa-router';
import authorized from '../../libs/middlewares/authorized';
import addRecipeContentAPI from './addRecipeContent';
import changeThumbnailAPI from './changeThumbnail';
import initRecipeAPI from './initRecipe';
import listRecipesAPI from './listRecipes';
import readRecipeAPI from './readRecipe';
import removeRecipeAPI from './removeRecipe';

const recipes = new Router();

recipes.post('/', authorized, initRecipeAPI);
recipes.patch('/thumbnail/:id', authorized, changeThumbnailAPI);
recipes.get('/', authorized, listRecipesAPI);
recipes.get('/:id', authorized, readRecipeAPI);
recipes.delete('/:id', authorized, removeRecipeAPI);
recipes.patch('/:id', authorized, addRecipeContentAPI);

export default recipes;
