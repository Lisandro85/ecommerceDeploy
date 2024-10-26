import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Orders } from "./orders.entity";
import { Repository } from "typeorm";
import { OrdersDetails } from "../Orders _Details/ordersDetails.entity";
import { Users } from "../Users/users.entity";
import { Products } from "../Products/products.entity";
import { isUUID} from "class-validator";
import { instanceToPlain } from "class-transformer";

@Injectable()
export class OrdersRepository{
    constructor(
        @InjectRepository (Orders)
        private readonly ordersRepository:Repository<Orders>,
        @InjectRepository (OrdersDetails)
        private readonly ordersDetailsRepository:Repository<OrdersDetails>,
        @InjectRepository (Users)
        private readonly usersRepository:Repository<Users>,
        @InjectRepository (Products)
        private readonly productsRepository:Repository<Products>
    ){}

    async addOreder(userId:string,products:any){
        let total=0;
        const user=await this.usersRepository.findOneBy({id:userId})
        if (!user){
            throw new NotFoundException(`Usuario con id: ${userId} no encontrado`)
        } 

        const order= new Orders()
        order.date=new Date()
        order.user=user

        const newOrder=await this.ordersRepository.save(order)

        const productIds = new Set()
        const productsArray= await Promise.all(
            products.map(async (element)=>{
                
                if (productIds.has(element.id)) {
                    throw new BadRequestException(`El producto con id ${element.id} ya está en el carrito!`);
                }

                productIds.add(element.id);
                
                
                if (!isUUID(element.id)) {
                    throw new BadRequestException(`El id ${element.id} no tiene un formato válido de UUID`);
                }
                const product=await this.productsRepository.findOneBy({
                    id:element.id
                });

                
                if (!product){
                    throw new NotFoundException(`Producto con id ${element.id} no existente`) 
                }


                if(product.stock===0){
                    throw new NotFoundException(`No hay stock de producto con id ${element.id}`);
                }

                total+=Number(product.price)
                await this.productsRepository.update({id:element.id},{stock:product.stock-1})
                return product;
            })
        )

        const orderDetails=new OrdersDetails()
        orderDetails.price=Number(Number(total).toFixed(2))
        orderDetails.products=productsArray
        orderDetails.order=newOrder
        await this.ordersDetailsRepository.save(orderDetails);

         const result= await this.ordersRepository.find({
            where: {id: newOrder.id},
            relations:{orderDetails:true}
        })
        return {
            message:"Pedido creado con exito",
            order: instanceToPlain(result)
        }
    }

    async getOrder(id:string):Promise<Partial<Orders>>{
        
        const order= await this.ordersRepository.findOne({
            where:{id},
            relations:{
                orderDetails:{
                    products:true
                }
            },
            select:{
                id:true,
                date:true,
                orderDetails:{
                    id:true,
                    price:true,
                    products:{
                        id:true,
                        name:true,
                        description:true,
                        price:true
                    }
                }
            }
        })
        if(!order){
            throw new NotFoundException(`Orden con id: ${id} no encontrada`)   
        }
        return instanceToPlain(order);
    }
}