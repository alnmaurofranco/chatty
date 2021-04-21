import { getCustomRepository, Repository } from 'typeorm';
import MessagesRepository from '@repositories/MessagesRepository';
import Message from '@entities/Message';

interface IRequest {
  admin_id?: string;
  text: string;
  user_id: string;
}

class CreateMessageService {
  private ormRepository: Repository<Message>;

  constructor() {
    this.ormRepository = getCustomRepository(MessagesRepository);
  }

  public async execute({
    admin_id,
    text,
    user_id,
  }: IRequest): Promise<Message> {
    const message = this.ormRepository.create({
      admin_id,
      text,
      user_id,
    });

    await this.ormRepository.save(message);

    return message;
  }
}

export default CreateMessageService;
