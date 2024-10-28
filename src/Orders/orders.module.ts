import { Module } from "@nestjs/common";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";
import { OrdersRepository } from "./orders.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Orders } from "./orders.entity";



@Module({
    imports:[TypeOrmModule.forFeature([Orders])],
    providers:[OrdersService,OrdersRepository],
    controllers:[OrdersController]
})

export class OrdersModule{}
