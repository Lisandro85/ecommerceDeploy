import { PickType } from "@nestjs/swagger";
import { CreateUserDto } from "../Users/CreateUserDto";

export class UpdateUserDto extends PickType(CreateUserDto,[
    'name',
    'email',
    'phone',
    'address',
    'country',
    'city'
]){}