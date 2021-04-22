import { Request, Response } from 'express';
import CreateSettingService from '@services/CreateSettingService';

class SettingsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { chat, username } = req.body;

    const settingService = new CreateSettingService();

    try {
      const settings = await settingService.execute({ chat, username });

      return res.json(settings);
    } catch (error) {
      return res.status(400).json({ message: `${error.message}` });
    }
  }

  public async findByUsername(req: Request, res: Response): Promise<Response> {
    const { username } = req.params;

    const settingsService = new CreateSettingService();

    try {
      const settings = await settingsService.findByUsername(username);

      return res.json(settings);
    } catch (error) {
      return res.status(400).json({ message: `${error.message}` });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { username } = req.params;
    const { chat } = req.body;

    const settingsService = new CreateSettingService();

    try {
      const settings = await settingsService.update({ chat, username });

      return res.status(204).json(settings);
    } catch (error) {
      return res.status(400).json({ message: `${error.message}` });
    }
  }
}

export default new SettingsController();
