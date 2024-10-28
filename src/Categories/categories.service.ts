import { Injectable } from "@nestjs/common";
import { CategoriesRepository } from "./categories.repository";
import { Categories } from "./categories.entity";

@Injectable()
export class CategoriesService{

    constructor (private readonly categoriesRepository:CategoriesRepository){}

    getCategories(){
        return this.categoriesRepository.getCategories()
    }

    seederCategories() {
        return this.categoriesRepository.seederCategories()
    }
    addCategories(categories:Partial<Categories>){
        return this.categoriesRepository.addCategories(categories)

    }
}