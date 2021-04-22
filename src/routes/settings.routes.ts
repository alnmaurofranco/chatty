import { Router } from 'express';
import SettingsController from '@controllers/SettingsController';

const settingsRoutes = Router();

settingsRoutes.post('/', SettingsController.create);
settingsRoutes.get('/:username', SettingsController.findByUsername);
settingsRoutes.put('/:username', SettingsController.update);

export default settingsRoutes;
