import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, Put, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { FileUploadService } from "./fileUploadService";
import { AuthGuard } from "../Guards/auth.guard";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";

@ApiTags('files')
@Controller('files')
export class FileUploadController{
    constructor(
        private readonly fileUpLoadservice:FileUploadService
    ){}
    
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Put('uploadimage/:id')
    @ApiOperation({summary:'Cargar imagen para un producto'})
    @ApiParam({name:'id',description:'id del producto',type:String})
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema:{
            type:'object',
            properties:{
                file:{
                    type:'string',
                    format:'binary'
                }
            }
        }
    })

    @UseInterceptors(FileInterceptor('file'))
    async upLoadImage(
        @Param('id')productId:string,
        @UploadedFile(
            new ParseFilePipe({
                validators:[
                    new MaxFileSizeValidator({
                        maxSize:200000,
                        message:'Supera el tamaño permitido: 200kb'
            }),
            new FileTypeValidator({
                fileType:/(.jpg|.jpeg|.png|.gif|.webp)/,
            })
                ]
            })
        )file:Express.Multer.File
    ){
        const result= await this.fileUpLoadservice.upLoadImage(file,productId)
        return result;
    }

}