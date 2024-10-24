import { PickType } from "@nestjs/swagger";
import { CreateUserDto } from "../Users/CreateUserDto";

export class LoginUserDto extends PickType(CreateUserDto,[
    'email',
    'password'
]){}