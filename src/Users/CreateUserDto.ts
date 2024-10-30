
import { IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsString, IsStrongPassword, Matches, MaxLength, MinLength, Validate } from "class-validator";
import { ValidatePassword } from "../decorators/validatePswDecorator";
import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";

export class CreateUserDto{
    @IsEmpty()
    @ApiHideProperty()
    isAdmin?:boolean
    
   
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    @ApiProperty({
        description:'Nombre de usuario, minimo 3 caracteres, maximo 80, no puede estar vacio',
        example: 'Test'
    })
    name:string

    @IsEmail()
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description:'Email del usuario, no puede estar vacio, debe ser un email valido',
        example: 'test@mail.com'
    })
    email:string

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(15)
    @IsStrongPassword({
        minNumbers:1,
        minLowercase:1,
        minSymbols:1,
        minUppercase:1   
    })
    @ApiProperty({
        description:`Password del usuario, no puede estar vacio, 
        debe contener al menos un numero, una letra minuscula, una letra mayuscula y un caracter especial`,
        example: 'T3$tT3$T'
    })
    password:string

    @IsNotEmpty()
    @Validate(ValidatePassword, ['password'])
    @ApiProperty({
        description:`Confirmacion de password, validacion adicional`,
        example: 'T3$tT3$T'
    })
    confirmPsw:string

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    @ApiProperty({
        description:`La dicrección del Usuario no puede estar vacia, debe contener un minimo de 
        3 caracteres y un maximo de 80`,
        example: 'Calle Test 123'
    })
    address:string

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        description:`El telefono del Usuario no debe estar vacio, debe ser un numero valido`,
        example: 555555
    })
    phone:number

    
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    @ApiProperty({
        description:`El pais del Usuario no debe estar vacio, debe contener un minimo de 5 caracteres y 
        un maximo de 20`,
        example: 'TestTest'
    })
    country:string

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    @ApiProperty({
        description:`La ciudad del Usuario no puede estar vacia, debe contener un minimo de 5 caracteres
        y un maximo de 20`,
        example: 'TestTest'
    })
    city:string
}



