import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateEmployeeDto {
    @ApiProperty({
        type: 'string'
    })
    @IsNotEmpty()
    @IsString()
    name: string;
    @ApiProperty({
        type: 'string'
    })
    @IsNotEmpty()
    @IsString()
    email: string;
    @ApiProperty({
        enum: Role,
        enumName: 'Role'
    })
    @IsNotEmpty()
    @IsEnum(Role)
    role: Role;
}
