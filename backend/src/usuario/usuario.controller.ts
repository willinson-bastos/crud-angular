import { Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, Post, Put, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioEntity } from './usuario.entity';
//import { UploadService } from 'src/arquivos/upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import * as path from 'path';

@Controller('usuarios')//Exemplo: http://localhost:8080/usuarios
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService//,
                //private readonly uploadService: UploadService
        ) { }

    @Post()
    async create(@Body() usuario: UsuarioEntity): Promise<UsuarioEntity> {
        try{
            return this.usuarioService.create(usuario);
        }catch(error){
            throw new HttpException(error.message, HttpStatus.CONFLICT);
        }
    }
    @Get()
    async readAll(): Promise<UsuarioEntity[]> {
        return this.usuarioService.readAll();
    }
    @Get(':id')
    async readOne(@Param('id') id: number): Promise<UsuarioEntity> {
        return this.usuarioService.readOne(id);
    }
    @Put(':id')
    async update(@Param('id') id: number, @Body() usuario: UsuarioEntity): Promise<UsuarioEntity> {
        return this.usuarioService.update(id, usuario);
    }
    @Delete(':id')
    async delete(@Param('id') id: number):Promise<void> {
        return this.usuarioService.delete(id);
    }

    @Post(':id/upload')@UseInterceptors(FileInterceptor('file'))
    async uploadArquivo(@Param('id') id:number, @UploadedFile() file: Express.Multer.File){
        return this.usuarioService.upload(id, file);
    }

    @Get(':id/upload')
    async getImagem(@Param('id') id: number): Promise<string>{
        const usuario = await this.usuarioService.readOne(id);
        if(!usuario){
            throw new NotFoundException('Usuário não encontrado');
        }
        const imagemPath = path.join(usuario.imagem);
        const pathUrl = imagemPath.replace(/\\/g, '/');;
        const imagemUrl = `/${pathUrl}`;
        return imagemUrl;
    }
    

}
