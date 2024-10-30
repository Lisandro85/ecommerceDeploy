import { BadRequestException, HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Orders } from "./orders.entity";
import { EntityManager, Repository } from "typeorm";
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
        private readonly entityManager:EntityManager
    ){}


    async addOreder(userId:string,products:any):Promise<{message:string,order: any}>{
        let total=0;
        const queryRunner= this.entityManager.connection.createQueryRunner()
        await queryRunner.connect()
        await queryRunner.startTransaction()
        try {
            const user=await queryRunner.manager.findOneBy(Users,{id:userId})

        if (!user){
            throw new NotFoundException(`Usuario con id: ${userId} no encontrado`)
        } 

        const productIds = new Set()
        const productsArray= []
                for(const element of products){
                
                if (productIds.has(element.id)) {
                    throw new BadRequestException(`El producto con id ${element.id} ya está en el carrito!`);
                }

                productIds.add(element.id);
                
                
                if (!isUUID(element.id)) {
                    throw new BadRequestException(`El id ${element.id} no tiene un formato válido de UUID`);
                }
                const product=await queryRunner.manager.findOneBy(Products,{
                    id:element.id
                });

                
                if (!product){
                    throw new NotFoundException(`Producto con id ${element.id} no existente`) 
                }


                if(product.stock===0){
                    throw new NotFoundException(`No hay stock de producto con id ${element.id}`);
                }

                total+=Number(product.price)
                await queryRunner.manager.update(Products,{id:element.id},{stock:product.stock-1})
                productsArray.push(product)
            }
            
        const order = queryRunner.manager.create(Orders,{ date: new Date(), user });
        const newOrder = await queryRunner.manager.save(Orders,order);

        const orderDetails=new OrdersDetails()
        orderDetails.price=Number(Number(total).toFixed(2))
        orderDetails.products=productsArray
        orderDetails.order=newOrder
        await queryRunner.manager.save(OrdersDetails,orderDetails);

         const result= await queryRunner.manager.find(Orders,{
            where: {id: newOrder.id},
            relations:{orderDetails:true}
        })
        await queryRunner.commitTransaction();
        return {
            message:"Pedido creado con exito",
            order: instanceToPlain(result)
        }
        } catch (error) {

            await queryRunner.rollbackTransaction();
            throw new HttpException({status:error.response.statusCode, error:error.response.message},error.response.statusCode);
            
        }
        finally{
            await queryRunner.release()
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