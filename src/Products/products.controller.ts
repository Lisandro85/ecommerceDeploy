import { Body, Controller,Delete,Get, Param, ParseUUIDPipe, Post, Put, Query, UseGuards, UseInterceptors,} from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./CreateProductDto";
import { AuthGuard } from "../Guards/auth.guard";
import { RolesDecorator } from "../decorators/rolesDecorator";
import { RolesGuard } from "../Guards/roles.Guard";
import { Role } from "../Auths/rolesEnum";
import { ApiBearerAuth, ApiQuery, ApiTags } from "@nestjs/swagger";
import { ValidatorInterceptor } from "src/interceptors/validation.interceptor";

@ApiTags('products')
@Controller('products')

export class ProductsController{
    constructor(private readonly productsService:ProductsService){}

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
        description:'Productos por pagina'
    })
    getProducts(@Query('page') page:string , @Query('limit') limit: string){
        if(page&&limit)
        return this.productsService.getProducts(Number(page),Number(limit))
        return this.productsService.getProducts(Number(1),Number(5))
    }
    
    @Get('seeder')
     seederProduct() {
        return this.productsService.seederProduct();
    }
    @UseInterceptors(ValidatorInterceptor)
    @Post()
    addProducts(@Body() products:CreateProductDto){
        return this.productsService.addProducts(products)

    }

    @ApiBearerAuth()
    @RolesDecorator(Role.Admin)
    @UseGuards(AuthGuard,RolesGuard)
    @Put(':id')
     updateProduct(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() product: CreateProductDto,
    ) {
        return  this.productsService.updateProduct(id, product);
    }

    @Get(':id')
    getProductById(@Param('id', ParseUUIDPipe) id: string) {
        return this.productsService.getProductById(id);
    }

    @Delete(':id')
    deleteProduct(@Param('id', ParseUUIDPipe) id: string){
        return this.productsService.deleteProduct(id)
        
    }
}
