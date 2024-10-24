import { ApiProperty } from "@nestjs/swagger";
import { ArrayMinSize, IsArray, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateOrderDto{
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    @ApiProperty({
        description:`Id del usuario, no puede estar vacio, debe ser tipo UUID, debe ser existente`,
        example:"9c33f7d6-ddd5-467f-a1e2-b9bdd699274a"
    })
    userId:string

    @IsArray()
    @ArrayMinSize(1)
    @ApiProperty({
        description:`Id del producto, no puede estar vacio, debe ser tipo UUID, debe ser existente`,
        example: [{ id: "402d6126-9e35-4b6b-8fd4-9c956eab9e69" }]
    })
    products:string []
}