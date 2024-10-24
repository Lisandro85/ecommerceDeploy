import { Module } from "@nestjs/common";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";
import { OrdersRepository } from "./orders.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Orders } from "./orders.entity";
import { OrdersDetails } from "../Orders _Details/ordersDetails.entity";
import { Users } from "../Users/users.entity";
import { Products } from "../Products/products.entity";


@Module({
    imports:[TypeOrmModule.forFeature([Orders,OrdersDetails,Users,Products])],
    providers:[OrdersService,OrdersRepository],
    controllers:[OrdersController]
})

export class OrdersModule{}
