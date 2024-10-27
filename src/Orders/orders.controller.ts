import { Body, Controller, Get, Param, ParseUUIDPipe, Post, UseGuards } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./CreateOrderDto";
import { AuthGuard } from "../Guards/auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('orders')
@Controller('orders')
export class OrdersController{
    constructor (private readonly ordersService:OrdersService){}
    
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Post()
    addOrder(@Body() order:CreateOrderDto){
        const {userId,products}=order
        return this.ordersService.addOrder(userId,products)
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get(':id')
    getOrder(@Param('id', new ParseUUIDPipe()) id:string){
        return this.ordersService.getOrder(id)
    }

}