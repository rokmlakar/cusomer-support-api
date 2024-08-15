import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}


    async findUserById(id: number): Promise<User | undefined> {
        return this.userRepository.findOne({ where: {id}});
    }

    async findByUsername(username: string):Promise<any> {
        return this.userRepository.findOne({ where: {username} })
    }
}
