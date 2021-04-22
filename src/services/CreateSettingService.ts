import { getCustomRepository, Repository } from 'typeorm';
import Setting from '@entities/Setting';
import SettingsRepository from '@repositories/SettingsRepository';

interface IRequest {
  username: string;
  chat: boolean;
}

class CreateSettingService {
  private ormRepository: Repository<Setting>;

  constructor() {
    this.ormRepository = getCustomRepository(SettingsRepository);
  }

  public async execute({ chat, username }: IRequest): Promise<Setting> {
    const userAlreadyExists = await this.ormRepository.findOne({ username });

    if (userAlreadyExists) {
      throw new Error('User already exists!');
    }

    const settings = this.ormRepository.create({
      chat,
      username,
    });

    await this.ormRepository.save(settings);

    return settings;
  }

  public async findByUsername(username: string): Promise<Setting> {
    const settings = await this.ormRepository.findOne({
      username,
    });

    return settings;
  }

  public async update({ chat, username }: IRequest): Promise<void> {
    await this.ormRepository
      .createQueryBuilder()
      .update(Setting)
      .set({ chat })
      .where('username = :username', { username })
      .execute();
  }
}

export default CreateSettingService;
