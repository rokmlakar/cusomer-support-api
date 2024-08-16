import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserDto } from './user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}


    @Get(':id')
    async getUserById(@Param('id') id: number): Promise<UserDto | undefined> {
        return this.userService.findUserById(id);
    }

    @Get()
    async getAllUsers(): Promise<UserDto[]> {
        return this.userService.getAllUsers();
    }

}
