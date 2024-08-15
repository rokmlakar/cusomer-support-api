import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
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

    @Get()
    @UseGuards(BasicAuthGuard)
    async getAllMessages(): Promise<Message[]> {
        return this.messageService.getAllMessages();
    }

    @Get("/:id")
    @UseGuards(BasicAuthGuard)
    async getMessageById(@Param('id')id: number): Promise<Message | undefined> {
        return this.messageService.getMessageById(id)
    }

    @Post(":id/response")
    async messageResponse(
        @Param('id') id: number,
        @Body('response') response: string,
        @Body('operatorId') operatorId: number
    ): Promise<Message> {
        return this.messageService.messageResponse(id, response, operatorId);
    }

    @Get('responses/user/:id')
    async getMessagesByUserId(@Param('id') id: number): Promise<Message[]> {
        return this.messageService.getMessagesByUserId(id);
    }
    
}
