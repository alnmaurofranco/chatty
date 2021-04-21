import MessagesController from '@controllers/MessagesController';
import { Router } from 'express';

const messagesRoutes = Router();

messagesRoutes.post('/', MessagesController.create);
messagesRoutes.get('/:id', MessagesController.showByUser);

export default messagesRoutes;
