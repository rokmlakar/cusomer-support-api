import { Controller, Get, Param } from '@nestjs/common';
import { RoomService } from './room.service';
import { Room } from './room.entity';
import { RoomDto } from './room.dto';

@Controller('room')
export class RoomController {
    constructor(private readonly roomService: RoomService) {}


    @Get()
    async getAllRooms(): Promise<RoomDto[]> {
        return this.roomService.getAllRooms();
    }

}
