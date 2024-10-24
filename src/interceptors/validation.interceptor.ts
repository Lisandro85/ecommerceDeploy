import { BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { Observable } from "rxjs";
import { CreateProductDto } from "src/Products/CreateProductDto";
import { CreateUserDto } from "src/Users/CreateUserDto";


@Injectable()
export class ValidatorInterceptor implements NestInterceptor{
    async intercept(context: ExecutionContext, next: CallHandler):Promise <Observable<any>>{

        const request=context.switchToHttp().getRequest()
        
        if(request.method==='POST'|| request.method==='PUT'){
            const body=request.body
            let dto;
            if (request.url.startsWith('/users')) {
                dto = plainToClass(CreateUserDto, body);
            } else if (request.url.startsWith('/products')) {
                dto = plainToClass(CreateProductDto, body);
            }
            const errors = await validate(dto);
            if (errors.length > 0) {
                throw new BadRequestException('Estructura de entidad no válida');
            }
        }
        return next.handle();
        }
    }
    
