import type { Context } from 'koa';
import uploadImage from '../../libs/s3upload';

async function imageUpload(ctx: Context) {
  try {
    console.log(ctx.request);
    // const { key, url } = await uploadImage(file as any);
    //ctx.body = { key, url };
  } catch (err: any) {
    ctx.throw(500, err);
  }
}

export default imageUpload;
