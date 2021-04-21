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
}

export default new SettingsController();
