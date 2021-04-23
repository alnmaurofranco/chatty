import Connection from '@entities/Connection';
import { Repository, getCustomRepository } from 'typeorm';
import ConnectionsRepository from '../repositories/ConnectionsRepository';

interface IRequest {
  socket_id: string;
  user_id: string;
  admin_id?: string;
  id?: string;
}

class CreateConnectionsService {
  private ormRepository: Repository<Connection>;

  constructor() {
    this.ormRepository = getCustomRepository(ConnectionsRepository);
  }

  public async execute({
    id,
    socket_id,
    user_id,
    admin_id,
  }: IRequest): Promise<Connection> {
    const connection = await this.ormRepository.create({
      socket_id,
      user_id,
      admin_id,
      id,
    });

    await this.ormRepository.save(connection);

    return connection;
  }

  public async findByUserId(user_id: string): Promise<Connection> {
    const userConnected = await this.ormRepository.findOne({ user_id });

    return userConnected;
  }

  public async findAllWithoutAdmin(): Promise<Connection[]> {
    const connections = await this.ormRepository.find({
      where: {
        admin_id: null,
      },
      relations: ['user'],
    });

    return connections;
  }

  public async findBySocketId(socket_id: string) {
    const connection = await this.ormRepository.findOne({ socket_id });

    return connection;
  }

  public async updateAdminId(user_id: string, admin_id: string) {
    await this.ormRepository
      .createQueryBuilder()
      .update(Connection)
      .set({ admin_id })
      .where('user_id = :user_id', {
        user_id,
      })
      .execute();
  }
}

export default CreateConnectionsService;
