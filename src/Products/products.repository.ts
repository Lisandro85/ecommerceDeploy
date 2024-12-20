import { BadRequestException, HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Products } from "./products.entity";
import { MoreThan, Repository } from "typeorm";
import { Categories } from "../Categories/categories.entity";
import * as data from '../utils/data.json'
import { plainToInstance } from "class-transformer";
import { CreateProductDto } from "./CreateProductDto";
import { validate as validateUUID } from 'uuid';



@Injectable()
export class ProductsRepository{
  categories:Array<string>
  constructor(
    @InjectRepository (Products)
    private readonly productsRepository:Repository<Products>,
    @InjectRepository (Categories)
    private readonly categoriesRepository:Repository<Categories>
  ){this.categories=Array.from(new Set(data.map(item=>item.category)))}
 
  async getProducts(page:number, limit: number):Promise<Products[]>{
    let  products=await this.productsRepository.find({
      where:{stock:MoreThan(0)},
      select: {
        id: true,
        name: true,
        stock: true,
        description: true,
        price: true,
        imgUrl: true,
    },
      relations:{category:true},
    });
    const start=(page-1)*limit;
    const end=start+limit;
    products=products.slice(start,end)
    return plainToInstance(Products,products);
  }

  async getProductById(id: string):Promise<Products> {
    const product= await this.productsRepository.findOne({  
      where: { id },
      relations: {category:true},
      select: {
        id: true,
        name: true,
        stock: true,
        description: true,
        price: true,
        imgUrl: true,
    },
    })
  
    if (!product){
      throw new BadRequestException(`Producto con Id: ${id} inexistente`)
    }
    return plainToInstance(Products,product)
  }

  async seederProduct():Promise <{message:string}> {
    const promises = data.map(async (element) => {
        const category = await this.categoriesRepository.findOne({where:{name:element.category}});
        const productExist=await this.productsRepository.findOne({
            where:{name:element.name}
        })
                if(productExist){
                  await this.productsRepository.delete(productExist.id)
                }
                if (category) {
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
                  
            }else{
              throw new BadRequestException('Categorias inexistentes, primero cargue las categorias desde el seeder')
            }
       
    });

    await Promise.all(promises);
    return ({message:"Productos cargados con exito"})
    
}

  async addProducts(products: CreateProductDto):Promise<{message:string}>{
    const productExist = await this.productsRepository.findOne({ where:{name:products.name}});

    if (productExist) {
      throw new BadRequestException(`El producto ${products.name} ya existe`);
    }
    
    if (!validateUUID(products.category)) {
      throw new BadRequestException('categoryId debe ser un UUID válido');
  }
    const categoryExist = await this.categoriesRepository.findOne({
      where: { id: products.category}
    });
   
    if(!categoryExist){
      throw new NotFoundException('Categoria inexistente')
    }


    const product=new Products()
    product.name=products.name;
    product.description=products.description;
    product.price = products.price;
    product.stock = products.stock;
    product.imgUrl = products.imgUrl;
    product.category = categoryExist;

    await this.productsRepository.save(product);
    return {message:`Producto con id: ${product.id},agregado correctamente`}
  }

  async updateProduct(id: string, product: CreateProductDto): Promise<{ message: string}> {

  const productExist = await this.productsRepository.findOne({ where: { id } });

  if (!productExist) {
      throw new NotFoundException(`Producto con id ${id} inexistente`);
  }

  const categoryFound =await this.categoriesRepository.findOne({where: {id:product.category}});
        if(!categoryFound) 
            throw new HttpException({status:404,error:"Categoria no encontrada."},404);

  await this.productsRepository.update(id, {...product,category:categoryFound});
  const updatedProduct = await this.productsRepository.findOne({ where: { id } });
  
  return {
      message: `Producto con Id: ${updatedProduct.id} modificado correctamente`
  };
}

  async deleteProduct(id:string):Promise<{message:string}>{
  const product=await this.productsRepository.findOneBy({id})
  if(!product){
    throw new BadRequestException(`Producto con id ${id}, inexistente`)
  }
  this.productsRepository.remove(product)
   return {message:`Producto con id: ${id} eliminado correctamente`, }

}
}
  







