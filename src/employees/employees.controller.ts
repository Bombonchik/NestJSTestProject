import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    Ip,
    ValidationPipe,
    ParseIntPipe
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Throttle, SkipThrottle } from '@nestjs/throttler';
import { MyLoggerService } from '../my-logger/my-logger.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { FindEmployeesDto } from './dto/find-employees.dto';

@SkipThrottle()
@Controller('employees')
export class EmployeesController {
    constructor(private readonly employeesService: EmployeesService) {
        this.logger = new MyLoggerService(EmployeesController.name);
    }
    private readonly logger: MyLoggerService;
    private static readonly validationPipe = new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true
    });

    @Post()
    create(
        @Body(EmployeesController.validationPipe)
        createEmployeeDto: CreateEmployeeDto
    ) {
        return this.employeesService.create(createEmployeeDto);
    }

    @SkipThrottle({ default: false }) // Enable throttling for this route
    @Get()
    findAll(
        @Ip() ip: string,
        @Query(EmployeesController.validationPipe) query: FindEmployeesDto
    ) {
        this.logger.log(`Request for ALL Employees\t${ip}`, EmployeesController.name);
        return this.employeesService.findAll(query.role);
    }

    @Throttle({ short: { ttl: 1000, limit: 1 } })
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.employeesService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body(EmployeesController.validationPipe)
        updateEmployeeDto: UpdateEmployeeDto
    ) {
        return this.employeesService.update(id, updateEmployeeDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.employeesService.remove(id);
    }
}
