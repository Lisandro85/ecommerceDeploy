import { Module } from "@nestjs/common";
import { CategoriesController } from "./categories.controller";
import { CategoriesRepository } from "./categories.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Categories } from "./categories.entity";
import { CategoriesService } from "./categories.service";

@Module({
    imports:[TypeOrmModule.forFeature([Categories])],
    providers:[CategoriesService,CategoriesRepository],
    controllers:[CategoriesController],
    exports: [TypeOrmModule]
})
export class CategoriesModule{}

