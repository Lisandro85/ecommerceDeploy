import { Exclude } from 'class-transformer';
import { Orders } from '../Orders/orders.entity';
import { Products } from '../Products/products.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

@Entity({name:'ordersDetails'})
export class OrdersDetails{

    @ApiProperty({
        description:`Id tipo UUiD, generado por la Base de Datos`,
    })
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @ApiProperty({
        description:`Precio del producto`,

    })
    @Column({type: 'decimal', precision: 10, scale: 2, nullable: false,})
    price:number;

    @ApiProperty({
        description:`Orden de la compra`,

    })
    @OneToOne(()=>Orders,(order)=>order.orderDetails)
    order:Orders
    

    
    @ApiProperty({
        description:`Producto comprado`,

    })
    @ManyToMany(()=>Products,(product)=>product.ordersDetails)
    products:Products[];

    @ApiHideProperty()
    @Exclude()
    @CreateDateColumn()
    createdAt?:Date
    
    @ApiHideProperty()
    @Exclude()
    @UpdateDateColumn()
    updateAt?:Date

}