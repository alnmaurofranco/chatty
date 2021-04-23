import { io } from '../server';
import CreateConnectionsService from '@services/CreateConnectionsService';
import CreateMessageService from '@services/CreateMessageService';
import ListByUserService from '../services/ListByUserService';

io.on('connect', async (socket) => {
  const connectionsService = new CreateConnectionsService();
  const messagesService = new CreateMessageService();
  const listByUserService = new ListByUserService();

  const allConnectionsWithoutAdmin = await connectionsService.findAllWithoutAdmin();

  io.emit('admin_list_all_users', allConnectionsWithoutAdmin);

  socket.on('admin_list_messages_by_user', async (params, callback) => {
    const { user_id } = params;

    const allMessages = await listByUserService.execute(user_id);

    callback(allMessages);
  });

  socket.on('admin_send_message', async (params) => {
    const { user_id, text } = params;

    await messagesService.execute({
      text,
      user_id,
      admin_id: socket.id,
    });

    const { socket_id } = await connectionsService.findByUserId(user_id);

    io.to(socket_id).emit('admin_send_to_client', {
      text,
      socket_id: socket.id,
    });
  });

  socket.on('admin_user_in_support', async (params) => {
    const { user_id } = params;
    await connectionsService.updateAdminId(user_id, socket.id);

    const allConnectionsWithoutAdmin = await connectionsService.findAllWithoutAdmin();

    io.emit('admin_list_all_users', allConnectionsWithoutAdmin);
  });
});
