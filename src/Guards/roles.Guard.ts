import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Role } from "src/Auths/rolesEnum";

@Injectable()
export class RolesGuard implements CanActivate{

    constructor (private readonly reflector:Reflector){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
            'roles', [context.getHandler(), context.getClass()]);


        
        const roleExist=()=>requiredRoles.some((roles)=>user?.roles?.includes(roles))
        const valid=user && user.roles && roleExist()
       
        if(!valid){
            throw new ForbiddenException('Acceso denegado al recurso')
        }
        return valid;
    }
}