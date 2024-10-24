import { Module } from '@nestjs/common';
import { UsersModule } from './Users/users.module';
import { ProductsModule } from './Products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeOrmConfig } from './config/typeorm';
import { CategoriesModule } from './Categories/categories.module';
import { OrdersModule } from './Orders/orders.module';
import { AuthsModule } from './Auths/auth.module';
import { FileUploadModule } from './file-upload/fileUploadModule';
import { JwtModule } from '@nestjs/jwt';
import { PreCarga } from './PreCarga Data/preCargaData';


@Module({
imports: [
  ConfigModule.forRoot({
    isGlobal: true,
    load:[typeOrmConfig],
  }),
  TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (configService: ConfigService) =>configService.get('typeorm'),
  }),
  UsersModule,
  ProductsModule,
  AuthsModule,
  CategoriesModule,
  OrdersModule,
  FileUploadModule,
  JwtModule.register({
    global:true,
    signOptions:{ expiresIn: '1h'},
    secret:process.env.JWT_SECRET
  })
],
controllers: [],
providers: [PreCarga],
})
export class AppModule {}

