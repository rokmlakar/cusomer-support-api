import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './room.entity';
import { Repository } from 'typeorm';
import { RoomDto } from './room.dto';

@Injectable()
export class RoomService {
    constructor(
        @InjectRepository(Room)
        private readonly roomRepository: Repository<Room>,
    ) {}

    toRoomDto(room: Room): RoomDto {
        if (!room) return undefined;
        return {
            id: room.id,
            name: room.name,
        };
    }

    async getAllRooms(): Promise<Room[] | undefined> {
       const rooms = await this.roomRepository.find();
       
        return rooms.map(this.toRoomDto.bind(this));
    }

    async findRoomById(id: number): Promise<Room | undefined> {
        return this.roomRepository.findOne({ where: {id}});
    }
}
