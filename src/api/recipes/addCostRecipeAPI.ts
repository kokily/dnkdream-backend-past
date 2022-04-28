import type { Context } from 'koa';
import Joi from 'joi';
import { validateBody } from '../../libs/utils';
import { Recipe } from '../../entities/Recipe';
import { dataSource } from '../../server';

async function addCostRecipeAPI(ctx: Context) {
  const { id }: { id: string } = ctx.params;

  type RequestType = {
    all_price: number;
  };

  const schema = Joi.object().keys({
    all_price: Joi.number().required(),
  });

  if (!validateBody(ctx, schema)) return;

  const { all_price }: RequestType = ctx.request.body;

  try {
    const recipeRepo = await dataSource.getRepository(Recipe);

    await recipeRepo.update({ id }, { all_price });

    ctx.status = 200;
  } catch (err: any) {
    ctx.throw(500, err);
  }
}

export default addCostRecipeAPI;
