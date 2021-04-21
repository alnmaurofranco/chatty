import { Request, Response, Router } from 'express';
import settingsRoutes from './settings.routes';

const routes = Router();

routes.get('/', (_req: Request, res: Response) => {
  return res.json({ message: 'Welcome to NLW-05' });
});

routes.use('/settings', settingsRoutes);

export default routes;
