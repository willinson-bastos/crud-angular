/*
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';

import { UsuarioModule } from 'src/usuario/usuario.module';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads', // Diretório
    })
  ],
  controllers: [UploadController],
  providers: [UploadService],
  exports: [UploadService]
})
export class UploadModule {}
*/