import { Exclude } from "class-transformer";
import { Orders } from "../Orders/orders.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";


@Entity({name:'users'})
export class Users{

    @ApiProperty({
        description:`Id tipo UUiD, generado por la Base de Datos`,
    })
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @ApiHideProperty()
    @Column({default:false})
    isAdmin:boolean
    
    @ApiProperty({
        description:`Nombre de usuario, minimo 3 caracteres, maximo 80, no puede estar vacio`,
        example:"Lisandro"
    })
    @Column({type:'varchar',length:50,nullable:false})
    name:string;


    @ApiProperty({
        description:`Email del usuario, no puede estar vacio, debe ser un email valido`,
        example:"example@mail.com"
    })
    @Column({type:'varchar',length:50,nullable:false})
    email:string;

    
    @ApiProperty({
        description:`Password del usuario, no puede estar vacio, 
        debe contener al menos un numero, una letra minuscula, una letra mayuscula y un caracter especial`,
        example:"Ex4$mpl3"
    })
    @Column({type:'varchar',length:128,nullable:false})
    password:string;

    @ApiProperty({
        description:`El telefono del Usuario no debe estar vacio, debe ser un numero valido`,
        example: '555555'
    })
    @Column({type:'int'})
    phone:number;

    @ApiProperty({
        description:`El pais del Usuario no debe estar vacio, debe contener un minimo de 5 caracteres y 
        un maximo de 20`,
        example: 'Argentina'
    })
    @Column({type:'varchar',length:50})
    country:string;

    @ApiProperty({
        description:`La dirección del Usuario no puede estar vacia, debe contener un minimo de 
        3 caracteres y un maximo de 80`,
        example: 'Calle Falsa 123'
    })
    @Column({type:'text'})
    address:string;
    
    @ApiProperty({
        description:`La ciudad del Usuario no puede estar vacia, debe contener un minimo de 5 caracteres
        y un maximo de 20`,
        example: 'Santa Rosa'
    })
    @Column({type:'varchar',length:50})
    city:string;
    
    @ApiProperty({
        description:`Listado de las ordenes de compra del Usuario`
    })
    @OneToMany(()=>Orders,(order)=>order.user)
    @JoinColumn({name:'order_id'})
    orders:Orders[];

    @ApiHideProperty()
    @Exclude()
    @CreateDateColumn()
    createdAt?:Date

    @Exclude()
    @ApiHideProperty()
    @UpdateDateColumn()
    updateAt?:Date
}