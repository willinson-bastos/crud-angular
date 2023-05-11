
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuario.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import { createWriteStream } from 'fs';
import { error } from 'console';


@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(UsuarioEntity)
        private usuarioRepository: Repository<UsuarioEntity>
    ) { }

    async create(usuario: UsuarioEntity): Promise<UsuarioEntity> {
        const { nome, email } = usuario;
        const usuarioExistente = await this.usuarioRepository.findOne({ where: { email } });

        if (usuarioExistente) {
            throw new Error('E-mail já cadastrado!');
        }
        const usuarioSave = this.usuarioRepository.create({ nome, email });
        return await this.usuarioRepository.save(usuario);
    }
    async readAll(): Promise<UsuarioEntity[]> {
        return await this.usuarioRepository.find();
    }
    async readOne(id: number): Promise<UsuarioEntity> {
        const usuarioUpdate = await this.usuarioRepository.findOne({ where: { id } });
        if (!usuarioUpdate) {
            throw new NotFoundException('Usuário não encontrado');
        }
        return await this.usuarioRepository.findOne({ where: { id } });
    }

    async update(id: number, usuario: UsuarioEntity): Promise<UsuarioEntity> {

        const usuarioUpdate = await this.usuarioRepository.findOne({ where: { id } });
        if (!usuarioUpdate) {
            throw new NotFoundException('Usuário não encontrado');
        }

        //const { email } = usuario;
        /*const usuarioExistente = await this.usuarioRepository.findOne({ where: { email } });
        if (usuarioExistente) {
            throw new Error('E-mail já cadastrado!');
        }*/

        usuarioUpdate.nome = usuario.nome;
        usuarioUpdate.email = usuario.email;
        usuarioUpdate.imagem = usuario.imagem;
        return await this.usuarioRepository.save(usuarioUpdate);
    }

    async delete(id: number): Promise<void> {    //Promise em Void não espera um 'return'
        const usuarioUpdate = await this.usuarioRepository.findOne({ where: { id } });
        if (!usuarioUpdate) {
            throw new NotFoundException('Usuário não encontrado');
        }
        if (usuarioUpdate.imagem) {
            fs.unlinkSync(usuarioUpdate.imagem);
        }
        await this.usuarioRepository.delete(id);
    }
    

    async upload(id: number, file: Express.Multer.File): Promise<UsuarioEntity> {
        const usuario = await this.readOne(id);
        if (!usuario) {
            throw new error('Usuário não encontrado!');
        }
        //const fileExtension = file.originalname.split('.').pop();
        const nomeArquivo = `${usuario.id}.jpg`;

        const caminhoPasta = './uploads';
        if(!fs.existsSync(caminhoPasta)){
            fs.mkdirSync(caminhoPasta);
        }

        const caminhoArquivo = `${caminhoPasta}/${nomeArquivo}`;

        if (usuario.imagem && fs.existsSync(usuario.imagem)) {
            fs.unlinkSync(usuario.imagem);
        }

        return new Promise((resolve, reject) =>
            createWriteStream(caminhoArquivo)
                .on('error', (error) => reject(error))
                .on('finish', async () => {
                    usuario.imagem = caminhoArquivo;
                    await this.update(id, usuario);
                    resolve(usuario);
                })
                .end(file.buffer)
        );
 
    }


}
