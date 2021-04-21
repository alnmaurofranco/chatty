import { getCustomRepository, Repository } from 'typeorm';
import UsersRepository from '@repositories/UsersRepository';
import User from '@entities/User';

class CreateUserService {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getCustomRepository(UsersRepository);
  }

  public async execute(email: string): Promise<User> {
    const userAlreadyExists = await this.ormRepository.findOne({ email });

    if (userAlreadyExists) {
      throw new Error('User already exists with e-mail!');
    }

    const user = this.ormRepository.create({
      email,
    });

    await this.ormRepository.save(user);

    return user;
  }
}

export default CreateUserService;
