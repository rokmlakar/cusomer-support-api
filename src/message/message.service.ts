import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { Message } from './message.entity';
import { User } from '../user/user.entity';
import { MessageDto } from './message.dto';
import { Room } from '../room/room.entity';
import { RoomService } from '../room/room.service';
import { UserService } from '../user/user.service';

@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>, 
        private readonly userService: UserService,
        @InjectRepository(Room)
        private readonly roomRepository: Repository<Room>, 
        private readonly roomService: RoomService,
    ) { }

    private toMessageDto(message: Message): MessageDto {
        return {
            id: message.id,
            message: message.message,
            isClosed: message.isClosed,
            user: this.userService.toUserDto(message.user),
            response: message.response,
            operator: message.operator ? this.userService.toUserDto(message.operator) : undefined,
            room: this.roomService.toRoomDto(message.room), 
        };
    }

    private async toMessageEntity(messageDto: MessageDto): Promise<Message> {
        const message = new Message();
        message.id = messageDto.id;
        message.message = messageDto.message;
        message.isClosed = messageDto.isClosed || false;
        message.response = messageDto.response || "";
    
        if (messageDto.user && messageDto.user.id) {
            const user = await this.userRepository.findOne({ where: { id: messageDto.user.id } });
            if (!user) {
                throw new NotFoundException('User not found');
            }
            message.user = user;
        } else {
            message.user = null;
        }
    
        if (messageDto.operator && messageDto.operator.id) {
            const operator = await this.userRepository.findOne({ where: { id: messageDto.operator.id } });
            if (!operator) {
                throw new NotFoundException('Operator not found');
            }
            message.operator = operator;
        } else {
            message.operator = null; 
        }
    
        if (messageDto.room && messageDto.room.id) {
            const room = await this.roomRepository.findOne({ where: { id: messageDto.room.id } });
            if (!room) {
                throw new NotFoundException('Room not found');
            }
            message.room = room;
        } else {
            message.room = null;
        }
    
        return message;
    }

    async getOpenMessages(): Promise<MessageDto[]> {
        const messages = await this.messageRepository.find({
            where: {isClosed : false},
            relations: ['user', 'room'],
        });
        return messages.map(this.toMessageDto.bind(this));
    }

    async getClosedMessages(): Promise<MessageDto[]> {
        const messages = await this.messageRepository.find({
            where: {isClosed : true},
            relations: ['user', 'room'],
        });
        return messages.map(this.toMessageDto.bind(this));
    }

    async create(messageDto: MessageDto): Promise<MessageDto> {
        const message = await this.toMessageEntity(messageDto);
        const savedMessage = await this.messageRepository.save(message);
        return this.toMessageDto(savedMessage);
    }

    async getMessageById(id: number): Promise<MessageDto | undefined> {
        const message = await this.messageRepository.findOne({ where: { id } });
        if (!message) {
            throw new NotFoundException('Message not found');
        }
        return this.toMessageDto(message);
    }

    async messageResponse(id: number, response: string, operatorId: number): Promise<MessageDto> {
        const message = await this.messageRepository.findOne({ where: { id }, relations: ['user', 'room'] });

        if (!message) {
            throw new Error('Message not found');
        }

        if (message.isClosed) {
            throw new ConflictException('Message is already closed');
        }

        message.response = response;
        message.isClosed = true;
        message.operator = { id: operatorId } as User;

        const updatedMessage = await this.messageRepository.save(message);
        return this.toMessageDto(updatedMessage);
    }

    async getMessagesResponseByUserId(userId: number): Promise<MessageDto[]> {
        const messages = await this.messageRepository.find({
            where: { user: { id: userId }, response: Not(IsNull()) },
            relations: ['user', 'room', 'operator']
        });
        return messages.map(this.toMessageDto.bind(this));
    }
}
