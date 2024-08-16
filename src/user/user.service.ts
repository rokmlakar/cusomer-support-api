import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    toUserDto(user: User | null): UserDto | undefined {
        if (!user) return undefined;
        return {
            id: user.id,
            username: user.username,
            role: user.role
        };
    }

    async findUserById(id: number): Promise<UserDto | undefined> {
        const user = await this.userRepository.findOne({ where: {id} })

        return this.toUserDto(user);
    }

    async getAllUsers(): Promise<UserDto[]> {
        const user = await this.userRepository.find();
        return user.map(this.toUserDto.bind(this));
    }

    async findByUsername(username: string):Promise<any> {
        return this.userRepository.findOne({ where: {username} })
    }
}
