import { Router } from 'express';
import SettingsController from '@controllers/SettingsController';

const settingsRoutes = Router();

settingsRoutes.post('/', SettingsController.create);

export default settingsRoutes;
