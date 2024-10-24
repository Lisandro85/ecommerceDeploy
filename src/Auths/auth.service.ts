import { BadRequestException, Injectable,UnauthorizedException } from "@nestjs/common";
import { UsersRepository } from "../Users/users.repository";
import * as bcrypt from 'bcryptjs'
import { JwtService } from "@nestjs/jwt";
import { Users } from "../Users/users.entity";

@Injectable()
export class AuthService{
    constructor (private readonly userRepository:UsersRepository,
        private readonly jwtService:JwtService
    ){}

    async singUp(user:Partial<Users>):Promise<{message:string}>{
        const {email,password}=user 

        const userExist=await this.userRepository.getUserByEmail(email)
        if(userExist){
            throw new BadRequestException('Email ya registrado, intente con otro')
        }
        const pswHash=await bcrypt.hash(password,10)

        const newUser= await this.userRepository.addUser(
            {...user,password:pswHash}
        )
      
        return {message: `Usuario con Id: ${newUser.id} creado con exito`}
    }

    async singIn(email:string,password:string):Promise<{message:string,token:string}>{
        const userExist=await this.userRepository.getUserByEmail(email)
        if(!userExist){
            throw new UnauthorizedException('Credenciales Incorrectas')
        }

        const validPsw=await bcrypt.compare(password,userExist.password)
        if(!validPsw){
            throw new UnauthorizedException('Credenciales Incorrectas')
        }
        const payLoad={
            id:userExist.id,
            email:userExist.email,
            isAdmin:userExist.isAdmin
        }
        
        const token=this.jwtService.sign(payLoad)
        return{
            message:'Usuario logueado con exito',
            token:token
        }

    }
    
}



   