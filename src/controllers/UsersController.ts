import { Request, Response } from 'express';
import CreateUserService from '@services/CreateUserService';

class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    const usersService = new CreateUserService();

    try {
      const user = await usersService.execute(email);

      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({ message: `${error.message}` });
    }
  }
}

export default new UsersController();
