import {
    Body,
    Controller,
    Get,
    Patch,
    Param,
    Post,
    Delete,
    Query,
    ParseIntPipe,
    ValidationPipe
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users') // handle all routes that start with /users
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get() // handle GET /users or /users?role=value
    findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        return this.usersService.findAll(role);
    }

    // Just for testing
    /*@Get('interns')
    findAllInterns() {
        return [];
    }*/

    @Get(':id') // handle GET /users/:id
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findOne(id);
    }

    @Post() // handle POST /users
    create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Patch(':id') // handle PATCH /users/:id
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body(ValidationPipe) updateUserDto: UpdateUserDto
    ) {
        return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id') // handle DELETE  /users/:id
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.delete(id);
    }
}
