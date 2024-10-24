import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Categories } from "./categories.entity";
import { Repository } from "typeorm";
import * as data from '../utils/data.json'


@Injectable()
export class CategoriesRepository{
    categories:Array<string>

    constructor (
        @InjectRepository(Categories)
        private readonly categoriesRepository:Repository<Categories> //Repository {Users, Products..Categories}
    ){this.categories=Array.from(new Set(data.map(item=>item.category)))}

        async seederCategories() {

        const promises = this.categories.map(async (element) => {
            const categoryExist=await this.categoriesRepository.findOne({where:{name:element}})
            
            
            if (categoryExist) {
                await this.categoriesRepository.delete(categoryExist.id)
            }
                await this.categoriesRepository
                    .createQueryBuilder()
                    .insert()
                    .into(Categories)
                    .values({ name: element})
                    .orIgnore() 
                    .execute();
        });

        await Promise.all(promises);
        return "Categorias agregadas con exito"
    }

    async getCategories() {
        return this.categoriesRepository.find({
            select:{
                id:true,
                name:true
            }
        })
    }
}