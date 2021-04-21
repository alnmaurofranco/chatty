import { Request, Response } from 'express';
import CreateMessageService from '@services/CreateMessageService';
import ListByUserService from '@services/ListByUserService';

class MessagesController {
  public async showByUser(req: Request, res: Response) {
    const { id: user_id } = req.params;

    const listByUserService = new ListByUserService();

    try {
      const list = await listByUserService.execute(user_id);

      return res.status(200).json(list);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  public async create(req: Request, res: Response) {
    const { admin_id, text, user_id } = req.body;

    const messageService = new CreateMessageService();

    try {
      const message = await messageService.execute({ admin_id, text, user_id });

      return res.status(200).json(message);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }
}

export default new MessagesController();
