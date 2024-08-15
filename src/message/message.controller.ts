import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { MessageService } from './message.service';
import { BasicAuthGuard } from '../auth/authGuard';
import { Message } from './message.entity';

@Controller('message')
export class MessageController {
    constructor(private readonly messageService: MessageService) {}

    @Post()
    @UseGuards(BasicAuthGuard)
    async create(@Body() message: Message): Promise<Message> {
        return this.messageService.create(message)
    }

    
}
