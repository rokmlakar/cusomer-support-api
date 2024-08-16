import { Body, Controller, Get, Param, Post, UseGuards, SetMetadata } from '@nestjs/common';
import { MessageService } from './message.service';
import { BasicAuthGuard } from '../auth/authGuard';
import { RolesGuard } from '../auth/rolesGuard';
import { Message } from './message.entity';
import { MessageDto } from './message.dto';

@Controller('message')
export class MessageController {
    constructor(private readonly messageService: MessageService) {}

    @Post()
    @UseGuards(BasicAuthGuard, RolesGuard)
    @SetMetadata('roles', ['user'])
    async create(@Body() message: MessageDto): Promise<MessageDto> {
        return this.messageService.create(message);
    }

    @Get('/open')
    @UseGuards(BasicAuthGuard, RolesGuard)
    @SetMetadata('roles', ['operator'])
    async getOpenMessages(): Promise<MessageDto[]> {
        return this.messageService.getOpenMessages();
    }
    @Get('/closed')
    @UseGuards(BasicAuthGuard, RolesGuard)
    @SetMetadata('roles', ['operator'])
    async getClosedMessages(): Promise<MessageDto[]> {
        return this.messageService.getClosedMessages();
    }

    @Get("/:id")
    @UseGuards(BasicAuthGuard, RolesGuard)
    @SetMetadata('roles', ['operator'])
    async getMessageById(@Param('id') id: number): Promise<MessageDto | undefined> {
        return this.messageService.getMessageById(id);
    }

    @Post(":id/response")
    @UseGuards(BasicAuthGuard, RolesGuard)
    @SetMetadata('roles', ['operator'])
    async messageResponse(
        @Param('id') id: number,
        @Body('response') response: string,
        @Body('operatorId') operatorId: number
    ): Promise<MessageDto> {
        return this.messageService.messageResponse(id, response, operatorId);
    }

    @Get('user/:id')
    @UseGuards(BasicAuthGuard, RolesGuard)
    @SetMetadata('roles', ['user'])
    async getMessagesResponseByUserId(@Param('id') id: number): Promise<MessageDto[]> {
        return this.messageService.getMessagesResponseByUserId(id);
    }
}
