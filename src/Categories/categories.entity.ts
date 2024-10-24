import { Exclude } from 'class-transformer';
import { Products } from '../Products/products.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';


@Entity({name: 'categories'})
export class Categories{
    @ApiProperty({
        description:`Id tipo UUiD, generado por la Base de Datos`
    })
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @ApiProperty({
        description:`Precargado de /seeder`
    })
    @Column({unique:true})
    name:string;

        @ApiProperty({
        description:`Representan los productos que apartienen a una categoria `
    })
    @OneToMany(()=>Products,(product)=>product.category, { cascade: true })
    @JoinColumn()
    products:Products[]

    @Exclude()
    @ApiHideProperty()
    @CreateDateColumn()
    createdAt?:Date
    
    @Exclude()
    @ApiHideProperty()
    @UpdateDateColumn()
    updateAt?:Date
}