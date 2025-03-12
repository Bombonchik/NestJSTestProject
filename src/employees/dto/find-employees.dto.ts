import { IsEnum, IsOptional } from 'class-validator';
import { Role } from '@prisma/client';

export class FindEmployeesDto {
    @IsOptional() // ✅ Allows role to be omitted
    @IsEnum(Role) // ✅ Enforces valid enum values
    role?: Role;
}
