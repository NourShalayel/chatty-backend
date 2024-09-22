import { authMiddlerWare } from '@global/helpers/auth-middlerware';
import express, { Router } from 'express';
import { Add } from '../controllers/add-chat-message';
import { Message } from '../controllers/add-message-reaction';
import { Get } from '../controllers/get-chat-message';
import { Update } from '../controllers/update-chat-message';
import { Delete } from '../controllers/delete-chat-message';


class ChatRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.get('/chat/message/conversation-list', authMiddlerWare.checkAuthentication, Get.prototype.conversationList);
    this.router.get('/chat/message/user/:receiverId', authMiddlerWare.checkAuthentication, Get.prototype.messages);
    this.router.post('/chat/message', authMiddlerWare.checkAuthentication, Add.prototype.message);
    this.router.post('/chat/message/add-chat-users', authMiddlerWare.checkAuthentication, Add.prototype.addChatUsers);
    this.router.post('/chat/message/remove-chat-users', authMiddlerWare.checkAuthentication, Add.prototype.removeChatUsers);
    this.router.put('/chat/message/mark-as-read', authMiddlerWare.checkAuthentication, Update.prototype.message);
    this.router.put('/chat/message/reaction', authMiddlerWare.checkAuthentication, Message.prototype.reaction);
    this.router.delete(
      '/chat/message/mark-as-deleted/:messageId/:senderId/:receiverId/:type',
      authMiddlerWare.checkAuthentication,
      Delete.prototype.markMessageAsDeleted
    );

    return this.router;
  }
}

export const chatRoutes: ChatRoutes = new ChatRoutes();
