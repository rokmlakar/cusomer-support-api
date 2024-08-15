import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';

@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>,
    ) {}


    async getAll(): Promise<Message[]> {
        return this.messageRepository.find({ relations: ['user', 'room']});
    }

    async create(message: Message): Promise<Message> {
        return this.messageRepository.save(message);
    }
}
