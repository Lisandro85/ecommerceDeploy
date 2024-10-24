import { Injectable, OnModuleInit } from "@nestjs/common";
import * as data from '../utils/data.json';
import { Categories } from "src/Categories/categories.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Products } from "src/Products/products.entity";


@Injectable()
export class PreCarga implements OnModuleInit {
    categories:Array<string>
    products:Array<string>

    constructor(
        @InjectRepository(Categories)
        private readonly categoriesRepository: Repository<Categories>,
        @InjectRepository(Products)
        private readonly productsRepository: Repository<Products>

    ) {this.categories=Array.from(new Set(data.map(item=>item.category)))
        this.products=Array.from(new Set(data.map(item=>item.name)))
    }

    async onModuleInit() {
        await this.loadData();
    }

    private async loadData() {
        const connection = this.categoriesRepository.manager.connection;
        const queryRunner = connection.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await this.resetProducts();
            await this.resetCategories();
            await this.addCategories(); 
            await this.addProducts();    
            await queryRunner.commitTransaction();

        } catch (error) {
            await queryRunner.rollbackTransaction();
            console.error("Error al cargar datos:", error);
        } finally {
            await queryRunner.release();
        }
    }

    private async resetCategories(){
        console.log("Reseteando categorias...")
        const promise=this.categories.map(async(element)=>{
            const categoryExist= await this.categoriesRepository.findOne({
                where:{name:element},
                relations:{products:true}
            })
            if(categoryExist){
                if (categoryExist.products.length===0) {
                    await this.categoriesRepository.delete(categoryExist.id)
            }else {
                console.log(`Categoria con nombre ${element} 
                    asociada a un producto, no se puede eliminar `)
            }  
            }
  
        });

        await Promise.all(promise);
    }; 

    private async addCategories() {
        let categoriesAdded = 0; 
        const promises = this.categories.map(async (element) => {
            const categoryExist=await this.categoriesRepository.findOne({where:{name:element}})

            if (!categoryExist) {

                await this.categoriesRepository
                    .createQueryBuilder()
                    .insert()
                    .into(Categories)
                    .values({ name: element})
                    .orIgnore() 
                    .execute();
                categoriesAdded++; 
            }
        });

        await Promise.all(promises);
        if(categoriesAdded>0){
            console.log("Categorias agregadas con exito")
        }; 
    }

    private async resetProducts(){
        console.log("Reseteando productos...")
        const promise= this.products.map(async(element)=>{
            const productExist= await this.productsRepository.findOne({
                where:{name:element},
                relations:{ordersDetails:true}
            })
                if(productExist){
                    if (productExist.ordersDetails.length===0) {
        
                        await this.productsRepository.delete(productExist.id)
                        
                    }else{
                        console.log(`Producto con nombre ${element} 
                            asociada a un orden, no se puede eliminar `)
                    }  
                }
             
        });

        await Promise.all(promise);
        
    }
    private async addProducts() {
        let productsAdded = 0; 

        const promises = data.map(async (element) => {
            const category = await this.categoriesRepository.findOne({where:{name:element.category}});
            const productExist=await this.productsRepository.findOne({
                where:{name:element.name}
            })
      
                    if (category && !productExist) {
                        const product = new Products();
                        
                        product.name = element.name;
                        product.description = element.description;
                        product.price = element.price;
                        product.stock = element.stock;
                        product.category = category;
        
                        await this.productsRepository
                            .createQueryBuilder()
                            .insert()
                            .into(Products)
                            .values(product)
                            .orIgnore()
                            .execute();
                        
                        productsAdded++; 
                }else { console.log(`ya existe el producto: ${element.name}`)}
           
        });

        await Promise.all(promises);
        if(productsAdded > 0){
            console.log("Productos cargados con exito")
        }
    }
}
