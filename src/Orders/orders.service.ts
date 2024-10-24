import { Injectable } from "@nestjs/common";
import { OrdersRepository } from "./orders.repository";
import { CreateOrderDto } from "./CreateOrderDto";

@Injectable()
export class OrdersService {
    constructor(private readonly ordersRepository:OrdersRepository){}

        addOrder(userId:string,products:any){
            return this.ordersRepository.addOreder(userId,products)
        }


    getOrder(id:string){
        return this.ordersRepository.getOrder(id)
    }
}