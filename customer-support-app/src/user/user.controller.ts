import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}


    @Get(':id')
    async getUserById(@Param('id') id: number): Promise<User | undefined> {
        return this.userService.findUserById(id);
    }

}
