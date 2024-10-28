import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateCategoriesDto{

@IsString()
@IsNotEmpty()
@Length(3, 50)
@ApiProperty({
    description:'Nombre de la nueva categoria, no puede estar vacio',
    example: 'consola video juegos'
})
name: string;
}