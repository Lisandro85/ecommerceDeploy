import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Put, Query, UseGuards} from "@nestjs/common";
import { UsersService } from "./users.service";
import { AuthGuard } from "../Guards/auth.guard";
import { RolesDecorator } from "../decorators/rolesDecorator";
import { Role } from "../Auths/rolesEnum";
import { RolesGuard } from "../Guards/roles.Guard";
import { ApiBearerAuth, ApiQuery, ApiTags } from "@nestjs/swagger";
import { UpdateUserDto } from "./UpdateUserDto";
import { CreateUserDto } from "./CreateUserDto";


@ApiTags('users')
@Controller('users')

export class UsersController{
    constructor(private readonly usersService:UsersService,
    ){}

    @ApiBearerAuth()
    @RolesDecorator(Role.Admin)
    @UseGuards(AuthGuard,RolesGuard)
    @Get()
    @ApiQuery({
        name:'page',
        required:false,
        type:String,
        description:'Numero de pagina'
    })
    @ApiQuery({
        name:'limit',
        required:false,
        type:String,
        description:'Usuarios por pagina'
    })
     getUsers(@Query('page') page:string , @Query('limit') limit: string){
        if(page&&limit)
            return this.usersService.getUsers(Number(page),Number(limit))
            return this.usersService.getUsers(Number(1),Number(5))
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get(':id')
     getUserById(@Param('id',  ParseUUIDPipe) id: string){
        return this.usersService.getUserById(id);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Put(':id')
    updateUser(@Param('id',  ParseUUIDPipe) id: string, @Body() user:UpdateUserDto) {
        return this.usersService.updateUser(id, user);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Delete(':id')
    deleteUser(@Param('id',  ParseUUIDPipe) id:string){
        return this.usersService.deleteUser(id)
    }
    


}   
    
 

