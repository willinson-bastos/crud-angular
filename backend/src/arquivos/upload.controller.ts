/*
import { Controller, Post, Param, UploadedFile, UseInterceptors, Put } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { UploadService } from "./upload.service";

@Controller(':id/upload')
export class UploadController{
    constructor(private readonly uploadService: UploadService){}
    
    
    @Post('imagem')
    @UseInterceptors(FileInterceptor('file'))
    async uploadArquivo(@Param('id') id:number, @UploadedFile() file: Express.Multer.File){
        return this.uploadService.upload(id, file);
    }


}
*/