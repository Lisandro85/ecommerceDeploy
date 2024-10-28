import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { AuthGuard } from "../Guards/auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { RolesDecorator } from "src/decorators/rolesDecorator";
import { Role } from "src/Auths/rolesEnum";
import { CreateCategoriesDto } from "./createCategoriesDto";

@ApiTags('categories')
@Controller('categories')
export class CategoriesController{
    constructor (private readonly categoriesService:CategoriesService){}

    @Get()
    getCategories(){
        return this.categoriesService.getCategories()

    }

    @Get('seeder')
    seederCategories(){
        return this.categoriesService.seederCategories()
    }

    @Post()
    addCategories(@Body() categories:CreateCategoriesDto){
        return this.categoriesService.addCategories(categories)
    }
}