import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { Message } from './message.entity';
import { User } from 'src/user/user.entity';

@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>,
    ) { }


    async getAllMessages(): Promise<Message[]> {
        return this.messageRepository.find({ relations: ['user', 'room'] });
    }

    async create(message: Message): Promise<Message> {
        return this.messageRepository.save(message);
    }

    async getMessageById(id: number): Promise<Message | undefined> {
        return this.messageRepository.findOne({ where: { id } })
    }

    async messageResponse(id: number, response: string, operatorId: number): Promise<Message> {
        const message = await this.messageRepository.findOne({ where: { id }, relations: ['user', 'room'] });

        if (!message) {
            throw new Error('Message not found');
        }

        message.response = response;
        message.isClosed = false;
        message.operator = { id: operatorId } as User;

        return this.messageRepository.save(message);
    }

    async getMessagesByUserId(userId: number): Promise<Message[]> {
        return this.messageRepository.find({
            where: { user: { id: userId }, response: Not(IsNull()) },
            relations: ['user', 'room', 'operator']
        });
    }
}
