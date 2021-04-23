import { io } from '../server';
import CreateConnectionsService from '../services/CreateConnectionsService';
import CreateUserService from '../services/CreateUserService';
import CreateMessageService from '../services/CreateMessageService';
import ListByUserService from '../services/ListByUserService';

interface IParams {
  email: string;
  text: string;
}

io.on('connect', (socket) => {
  const createConnectionsService = new CreateConnectionsService();
  const createUserService = new CreateUserService();
  const createMessageService = new CreateMessageService();
  const listByUserService = new ListByUserService();

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

    const allMessages = await listByUserService.execute(user_id);

    socket.emit('client_list_all_messages', allMessages);

    const allUsers = await createConnectionsService.findAllWithoutAdmin();
    io.emit('admin_list_all_users', allUsers);
  });

  socket.on('client_send_to_admin', async (params) => {
    const { text, socket_admin_id } = params;

    const socket_id = socket.id;

    const { user_id } = await createConnectionsService.findBySocketId(
      socket_id
    );

    const message = await createMessageService.execute({
      text,
      user_id,
    });

    io.to(socket_admin_id).emit('admin_receive_message', {
      message,
      socket_id,
    });
  });
});
