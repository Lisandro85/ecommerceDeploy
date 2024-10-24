import { Exclude } from "class-transformer";
import { OrdersDetails } from "../Orders _Details/ordersDetails.entity";
import { Users } from "../Users/users.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";


@Entity({name:'orders'})
export class Orders{

    @ApiProperty({
        description:`Id tipo UUiD, generado por la Base de Datos`,
    })
    @PrimaryGeneratedColumn('uuid')
    id:string;

        @ApiProperty({
        description:`Fecha de la orden de compra`,
    })
    @Column({type:'date'})
    date:Date;

    @ApiProperty({
        description:`Id del usuario que le apartieene la orden`,
    })
    @ManyToOne(()=>Users,(user)=>user.orders,{ onDelete: 'CASCADE' })
    @JoinColumn({name:'user_id'})
    user:Users;

    @ApiProperty({
        description:`Detelle de la orden de compra`
    })
    @OneToOne(()=>OrdersDetails,(orderDetails)=>orderDetails.order)
    @JoinColumn({name:'order_id'})
    orderDetails:OrdersDetails

    @ApiHideProperty()
    @Exclude()
    @CreateDateColumn()
    createdAt?:Date
    
    @ApiHideProperty()
    @Exclude()
    @UpdateDateColumn()
    updateAt?:Date

}