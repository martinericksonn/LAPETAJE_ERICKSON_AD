import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('/message')
  sendMessageIndiv(
    @Body('user1') user1: string,
    @Body('user2') user2: string,
    @Body('message') message: any,
  ) {
    return this.chatService.sendMessageIndiv(user1, user2, message);
  }

  @Post('/message-group')
  sendMessageGroup(@Body('user') uid: string, @Body('message') message: any) {
    return this.chatService.sendMessageGroup({ uid, message });
  }
}
