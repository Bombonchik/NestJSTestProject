import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './all-exceptions.filter';

//import { MyLoggerService } from './my-logger/my-logger.service';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    /*const app = await NestFactory.create(AppModule, { bufferLogs: true, });
    app.useLogger(app.get(MyLoggerService)); */ // Way to use custom logger globally

    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

    app.enableCors(); // For now api is open to all origins (to everyone)
    app.setGlobalPrefix('api');
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
