import { Request, Response, Router } from 'express';
import settingsRoutes from './settings.routes';
import usersRoutes from './users.routes';
import messagesRoutes from './messages.routes';

const routes = Router();

routes.get('/', (_req: Request, res: Response) => {
  return res.json({ message: 'Welcome to NLW-05' });
});

routes.use('/settings', settingsRoutes);
routes.use('/users', usersRoutes);
routes.use('/messages', messagesRoutes);

export default routes;
