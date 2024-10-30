import { IsNotEmpty, IsNumber, IsString, Matches } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";



export class CreateProductDto{


    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description:`Nombre del producto, no puede estar vacio`,
        example:"Teclado Lenovo"
    })
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description:`Descripcion del producto, no puede estar vacio`,
        example:"Teclado mecanico, apto para el Gaming, ergonomico, ultima tenologia"
    })
    description: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        description:`Presio del producto, debe ser un numero, no puede estar vacio`,
        example:100
    })
    price: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        description:`Stock del producto, debe ser un numero, no puede estar vacio`,
        example:10
    })
    stock: number;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description:`Imagen del producto, debe ser una url valida, no puede estar vacia`,
        example:'https://example.com/laptop-x300.jpg'
    })
    imgUrl: string
    
    @IsString() 
    @IsNotEmpty()  
    @ApiProperty({
        description: 'ID de la categoría a la que pertenece el producto',
        example: 'ID_DE_LA_CATEGORÍA_EXISTENTE'
    })
    category:string

}