import Router from 'koa-router';
import authorized from '../../libs/middlewares/authorized';
import imageUpload from './imageUpload';

const upload = new Router();

upload.post('/', imageUpload);

export default upload;
