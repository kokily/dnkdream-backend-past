import type { Middleware } from 'koa';
import { User } from '../../entities/User';
import { dataSource } from '../../server';

const authorized: Middleware = async (ctx, next) => {
  const userRepo = await dataSource.getRepository(User);

  if (!ctx.state.user) {
    ctx.status = 401;
    ctx.body = '로그인 후 이용해 주세요';
    return;
  }

  const user = await userRepo.findOneBy({ id: ctx.state.user.user_id });

  if (!user) {
    ctx.status = 401;
    ctx.body = '로그인 후 이용해 주세요';
    return;
  }

  return next();
};

export default authorized;
