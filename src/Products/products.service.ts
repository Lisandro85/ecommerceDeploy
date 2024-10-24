import { Injectable } from "@nestjs/common";
import { ProductsRepository } from "./products.repository";
import { Products } from "./products.entity";
import { CreateProductDto } from "./CreateProductDto";




@Injectable()
export class ProductsService{


    constructor(private productRepository:ProductsRepository){}
    
    getProducts( page:number,limit:number){
        return this.productRepository.getProducts(page,limit)
    }
    getProductById(id: string) {
        return this.productRepository.getProductById(id)
    }
    addProducts(products:CreateProductDto){
        return this.productRepository.addProducts(products)

    }

    seederProduct() {
        return this.productRepository.seederProduct(); 
    }

    updateProduct(id: string, product:Partial<Products>) {
        return this.productRepository.updateProduct(id,product);
    }
    deleteProduct(id:string){
        return this.productRepository.deleteProduct(id)
    }
}
