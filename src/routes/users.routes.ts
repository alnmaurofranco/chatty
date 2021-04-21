import UsersController from '@controllers/UsersController';
import { Router } from 'express';

const usersRoutes = Router();

usersRoutes.post('/', UsersController.create);

export default usersRoutes;
