import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGblobal } from './middleware/logger.middleware';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swaggerConfig=new DocumentBuilder()
  .setTitle('Ecommerce')
  .setDescription('API de proyecto Modulo N°4')
  .setVersion('1.0.0')
  .addBearerAuth()
  .build()
  const document= SwaggerModule.createDocument(app,swaggerConfig)
  SwaggerModule.setup('api',app,document,{
    swaggerOptions:{
      tagsSorter:'alpha'
    }
  })
  app.use(loggerGblobal)
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    transform:true
  }))
  await app.listen(3000);
  console.log('server listening on http://localhost:3000')
  }
bootstrap();
