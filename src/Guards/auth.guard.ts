import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { Role } from "../Auths/rolesEnum";


@Injectable()
export class AuthGuard implements CanActivate{
    constructor (
        private readonly jwtService:JwtService
    ){}
     canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request=context.switchToHttp().getRequest()
        
        const authExist=request.headers['authorization']
        if(!authExist){
            throw new UnauthorizedException('Autorización de acceso no enviada')
        }

        const token = request.headers.authorization.split(' ')[1]

        if(!token){
            throw new UnauthorizedException('Token de acceso no enviado')
        }

        try {
            const secret=process.env.JWT_SECRET
            const user= this.jwtService.verify(token, {secret})
            user.iat=new Date(user.iat*1000)
            user.exp=new Date(user.exp*1000)
            user.roles=[]
            if(user.isAdmin){
                user.roles.push(Role.Admin)
            } else {
                user.roles.push(Role.User)
            }
            
            request.user=user

            return true
            
        } catch (error) {
            throw new UnauthorizedException('Token invalido')           
        } 
}
}