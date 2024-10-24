import { Exclude } from "class-transformer";
import { Categories } from "../Categories/categories.entity";
import { OrdersDetails } from "../Orders _Details/ordersDetails.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";


@Entity({name:'products'})
export class Products{
    @ApiProperty({
        description:`Id tipo UUiD, generado por la Base de Datos`,
    })
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @ApiProperty({
        description:`Nombre del producto, no puede estar vacio`,
        example:"Teclado Lenovo"
    })
    @Column({type:'varchar',length:50,nullable:false,unique:true})
    name:string;

    @ApiProperty({
        description:`Descripcion del producto, no puede estar vacio`,
        example:"Teclado mecanico, apto para el Gaming, ergonomico, ultima tenologia"
    })
    @Column({type:'text',nullable:false})
    description:string;

    @ApiProperty({
        description:`Presio del producto, debe ser un numero, no puede estar vacio`,
        example:100
    })
    @Column({ type: 'decimal', precision: 10,scale: 2,nullable: false})
    price:number;

    @ApiProperty({
        description:`Stock del producto, debe ser un numero, no puede estar vacio`,
        example:10
    })
    @Column({type:'int',nullable:false})
    stock:number;

    @ApiProperty({
        description:`Imagen del producto, debe ser una url valida, no puede estar vacia`,
        example:'https://example.com/laptop-x300.jpg'
    })
    @Column({type: 'varchar',default:'www.expample.com'})
    imgUrl:string;

    @ApiProperty({
        description:`Representa la categoria del producto`,
    })
    @ManyToOne(()=>Categories,(category)=>category.products, { onDelete: 'CASCADE' })
    @JoinColumn({name:'category_id'})
    category:Categories

    @ApiProperty({
        description:`Represena el detalle del producto`,
    })
    @ManyToMany (()=>OrdersDetails,(ordersDetails)=>ordersDetails.products)
    @JoinTable()
    ordersDetails:OrdersDetails[]

    @Exclude()
    @ApiHideProperty()
    @CreateDateColumn()
    createdAt?:Date

    @ApiHideProperty()
    @Exclude()
    @UpdateDateColumn()
    updateAt?:Date
}