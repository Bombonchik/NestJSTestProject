import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    private users = [
        {
            id: 1,
            name: 'Leanne Graham',
            email: 'sincere@something.biz',
            role: 'INTERN'
        },
        {
            id: 2,
            name: 'Ervin Howell',
            email: 'shanna@melisa.tv',
            role: 'INTERN'
        },
        {
            id: 3,
            name: 'Clementine Bauch',
            email: 'nathan@yesenia.net',
            role: 'ENGINEER'
        },
        {
            id: 4,
            name: 'Patricia Lebsack',
            email: 'luliana.siner@gmail.com',
            role: 'ENGINEER'
        },
        {
            id: 5,
            name: 'Chelsey Dietrich',
            email: 'lucio_hettinger@annie.ca',
            role: 'ADMIN'
        }
    ];

    findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        if (role) {
            const filteredUsers = this.users.filter(
                (user) => user.role === role
            );
            if (filteredUsers.length === 0) {
                throw new NotFoundException(
                    `Users with role ${role} not found`
                );
            }
            return filteredUsers;
        }
        return this.users;
    }

    findOne(id: number) {
        const user = this.users.find((user) => user.id === id);
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        return user;
    }

    create(createUserDto: CreateUserDto) {
        const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
        const newUser = {
            id: usersByHighestId[0].id + 1,
            ...createUserDto
        };
        this.users.push(newUser);
        return newUser;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        this.users = this.users.map((user) => {
            if (user.id === id) {
                return {
                    ...user,
                    ...updateUserDto
                };
            }
            return user;
        });
        return this.findOne(id);
    }

    delete(id: number) {
        const removedUser = this.findOne(id);
        this.users = this.users.filter((user) => user.id !== id);
        return removedUser;
    }
}
