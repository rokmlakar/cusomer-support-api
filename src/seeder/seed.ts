import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { Room } from '../room/room.entity';
import * as bcrypt from 'bcrypt';

const saltRounds = 10;

@Injectable()
export class SeederService implements OnModuleInit {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Room)
        private readonly roomRepository: Repository<Room>,
    ) { }

    async onModuleInit() {
        await this.seed();
    }

    async seed() {
        await this.seedUsers();
        await this.seedRooms();
    }

    private async seedUsers() {
        const existingUsers = await this.userRepository.find();
        if (existingUsers.length > 0) {
            return;
        }

        const hashedPassword = await bcrypt.hash("pass", saltRounds);
        const users = [
            {
                "username": "Jure",
                "password": hashedPassword,
                "role": "operator"
            },
            {
                "username": "Miha",
                "password": hashedPassword,
                "role": "operator"
            },
            {
                "username": "Luigi",
                "password": hashedPassword,
                "role": "operator"
            },
            {
                "username": "Mario",
                "password": hashedPassword,
                "role": "user"
            },
            {
                "username": "Roberto",
                "password": hashedPassword,
                "role": "user"
            },
            {
                "username": "Vili",
                "password": hashedPassword,
                "role": "user"
            }

        ];

        for (const user of users) {
            await this.userRepository.save(user);
        }
    }

    private async seedRooms() {
        const existingRooms = await this.roomRepository.find();
        if (existingRooms.length > 0) {
            return;
        }

        const rooms = [
            { name: 'Tehnika' },
            { name: 'Storitve' },
            { name: 'Pogovor' },
        ];

        for (const room of rooms) {
            await this.roomRepository.save(room);
        }
    }
}
