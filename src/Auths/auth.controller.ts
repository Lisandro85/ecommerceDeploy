import { Body, Controller, Post } from "@nestjs/common";
import { AuthService, } from "./auth.service";
import { LoginUserDto } from "./LoginUserDto";
import { CreateUserDto } from "../Users/CreateUserDto";
import { ApiTags } from "@nestjs/swagger";

///////prueba

@ApiTags('auth')
@Controller('auth')
export class AuthController{
    constructor(private readonly authService:AuthService){}

    @Post('signin')
    singIn(@Body() credentials:LoginUserDto){
       const {email,password}=credentials
        return this.authService.singIn(email,password)
    }

    @Post('signup')
    singUp(@Body() user:CreateUserDto){
        return this.authService.singUp(user)
    }

}