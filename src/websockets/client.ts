import { io } from '../server';
import CreateConnectionsService from '../services/CreateConnectionsService';
import CreateUserService from '../services/CreateUserService';
import CreateMessageService from '../services/CreateMessageService';

interface IParams {
  email: string;
  text: string;
}

io.on('connect', (socket) => {
  const createConnectionsService = new CreateConnectionsService();
  const createUserService = new CreateUserService();
  const createMessageService = new CreateMessageService();

  socket.on('client_first_access', async (params) => {
    const socket_id = socket.id;
    const { email, text } = params as IParams;

    let user_id = null;

    const userExists = await createUserService.findByEmail(email);

    if (!userExists) {
      // cria um novo cliente
      const user = await createUserService.execute(email);

      await createConnectionsService.execute({
        socket_id,
        user_id: user.id,
      });

      user_id = user.id;
    } else {
      user_id = userExists.id;
      // Faz validação do cliente já presente no websocket
      const connection = await createConnectionsService.findByUserId(
        userExists.id
      );

      if (!connection) {
        // Salvar o dado do cliente já existente
        await createConnectionsService.execute({
          socket_id,
          user_id: userExists.id,
        });
      } else {
        connection.socket_id = socket_id;
        await createConnectionsService.execute(connection);
      }
    }

    await createMessageService.execute({
      text,
      user_id,
    });
  });
});
