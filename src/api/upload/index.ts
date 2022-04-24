import Router from 'koa-router';
import authorized from '../../libs/middlewares/authorized';
import image from './image';

const upload = new Router();

upload.post('/', authorized, image);

export default upload;
