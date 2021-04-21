import { getCustomRepository, Repository } from 'typeorm';
import MessagesRepository from '@repositories/MessagesRepository';
import Message from '@entities/Message';

class ListByUserService {
  private ormRepository: Repository<Message>;

  constructor() {
    this.ormRepository = getCustomRepository(MessagesRepository);
  }

  public async execute(user_id: string): Promise<Message[]> {
    const list = await this.ormRepository.find({
      where: {
        user_id,
      },
      relations: ['user'],
    });

    return list;
  }
}

export default ListByUserService;
