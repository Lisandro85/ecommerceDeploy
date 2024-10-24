import { Injectable, NotFoundException } from "@nestjs/common";
import { Products } from "../Products/products.entity";
import { Repository } from "typeorm";
import { FileUploadRepository } from "./fileUploadRepository";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class FileUploadService{
    constructor(private readonly fileUploadRepository:FileUploadRepository,
        @InjectRepository(Products)
        private readonly productsRepository:Repository<Products>
    ){}
    async upLoadImage(file:Express.Multer.File, productId:string){
        const productExist=await this.productsRepository.findOneBy({id:productId})
        if(!productExist){
            throw new NotFoundException('Producto no encontrado')
        }
        const response= await this.fileUploadRepository.upLoadImage(file)
        if(!response.secure_url){
            throw new NotFoundException('Error al subir imagen a la nube')
        }
        await this.productsRepository.update(productId,{
            imgUrl:response.secure_url
        })
        const productUpdate=await this.productsRepository.findOneBy({id:productId})
        return {
            message:"Imagen actualizada correctamente",
            productUpdate
        }
    }
}