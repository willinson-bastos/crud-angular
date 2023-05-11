import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import { UsuarioEntity } from './usuario.entity';
//import { UploadService } from 'src/arquivos/upload.service';
//import { UploadModule } from 'src/arquivos/upload.module';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioEntity]),
  //UploadModule
],
  providers: [UsuarioService],
  controllers: [UsuarioController]//,
 // exports:[UsuarioService]
})
export class UsuarioModule {}
