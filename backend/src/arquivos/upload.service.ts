
/* import { Injectable } from '@nestjs/common';
import { createWriteStream } from 'fs';
import { UsuarioService } from 'src/usuario/usuario.service';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { error } from 'console';
import * as fs from 'fs';


@Injectable()
export class UploadService {
    constructor(private readonly usuarioService: UsuarioService) { }

    async upload(id: number, file: Express.Multer.File): Promise<UsuarioEntity> {
        const usuario = await this.usuarioService.readOne(id);
        if (!usuario) {
            throw new error('Usuário não encontrado!');
        }
        const fileExtension = file.originalname.split('.').pop();
        const nomeArquivo = `${usuario.id}_${fileExtension}`;

        const caminhoPasta = './uploads';
        if(!fs.existsSync(caminhoPasta)){
            fs.mkdirSync(caminhoPasta);
        }

        const caminhoArquivo = `${caminhoPasta}/${nomeArquivo}`;

        if (usuario.imagem) {
            fs.unlinkSync(usuario.imagem);
        }

        return new Promise((resolve, reject) =>
            createWriteStream(caminhoArquivo)
                .on('error', (error) => reject(error))
                .on('finish', async () => {
                    usuario.imagem = caminhoArquivo;
                    await this.usuarioService.update(id, usuario);
                    resolve(usuario);
                })
                .end(file.buffer)
        );

    }

} 
*/