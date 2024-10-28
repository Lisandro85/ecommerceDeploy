import { BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { Observable } from "rxjs";
import { CreateProductDto } from "../Products/CreateProductDto";
import { CreateUserDto } from "../Users/CreateUserDto";


@Injectable()
export class ValidatorInterceptor implements NestInterceptor{
    async intercept(context: ExecutionContext, next: CallHandler):Promise <Observable<any>>{

        const request=context.switchToHttp().getRequest()
        
        if(request.method==='POST'|| request.method==='PUT'){
            const body=request.body
            let dto;
            if (request.url.startsWith('/auth/signup')) {
                dto = plainToClass(CreateUserDto, body);
            } else if (request.url.startsWith('/products')) {
                dto = plainToClass(CreateProductDto, body);
            }
            const errors = await validate(dto);
            if (errors.length > 0) {
                const errorMessages = errors.map(err => {
                    return {
                        propiedad: err.property,
                        errores: Object.values(err.constraints)
                    };
                });
                throw new BadRequestException(
                    {message:'Estructura de entidad no válida',
                     errores:errorMessages   
                    });
            }
        }
        return next.handle();
        }
    }
    
