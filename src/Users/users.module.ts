import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersRepository } from "./users.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "./users.entity";
import { UsersService } from "./users.service";


@Module({
    imports:[TypeOrmModule.forFeature([Users])],
    providers:[UsersService,UsersRepository],
    controllers:[UsersController]
})
export class UsersModule {}