import { Module } from "@nestjs/common";
import { cloudinaryConfig } from "../config/claodinary";
import { FileUploadController } from "./fileUploadController";
import { FileUploadService } from "./fileUploadService";
import { FileUploadRepository } from "./fileUploadRepository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Products } from "../Products/products.entity";

@Module({
    imports:[TypeOrmModule.forFeature([Products])],
    providers:[FileUploadService,cloudinaryConfig,FileUploadRepository],
    controllers:[FileUploadController],
})
export class FileUploadModule{}