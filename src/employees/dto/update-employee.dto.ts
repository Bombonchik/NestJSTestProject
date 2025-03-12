import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateEmployeeDto {
    @ApiProperty({
        type: 'string',
        required: false
    })
    @IsOptional()
    @IsString()
    name?: string;
    @ApiProperty({
        type: 'string',
        required: false
    })
    @IsOptional()
    @IsString()
    email?: string;
    @ApiProperty({
        enum: Role,
        enumName: 'Role',
        required: false
    })
    @IsOptional()
    @IsEnum(Role)
    role?: Role;
}
