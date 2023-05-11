import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';

import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './usuario/usuario.module';
import { UsuarioEntity } from './usuario/usuario.entity';
import { CorsMiddleware } from './middlewares/cors.middlewares';
import { MulterModule } from '@nestjs/platform-express';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
//import { UsuarioController } from './usuario/usuario.controller';
//import { UploadController } from './arquivos/upload.controller';
//import { UploadModule } from './arquivos/upload.module';
//import { ImagemEntity } from './arquivos/imagem.entity';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'crud-angular',
        entities: [UsuarioEntity/*, ImagemEntity*/],
        synchronize: true,
        autoLoadEntities: true, //prestar atenção aqui
    }),
    MulterModule.register({
      dest: './uploads', 
    }),
    UsuarioModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','uploads'),//diretório
      serveRoot: '/uploads', //rota que as imagens serão servidas
    }),
  ],
  controllers: [AppController],
  providers: [AppService,CorsMiddleware],
})


export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware).forRoutes('*');
  }
}
