import { RoomDto } from "../room/room.dto";
import { UserDto } from "../user/user.dto";

export class MessageDto {
    id: number;
    message: string;
    isClosed: boolean;
    response: string;
    user: UserDto;
    operator: UserDto;
    room: RoomDto;
}