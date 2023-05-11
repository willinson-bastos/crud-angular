
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SERVER_PORT } from './config/constants';
import { CorsMiddleware } from './middlewares/cors.middlewares';
import { Request,Response } from 'express';
import * as cors from 'cors';
import * as express from 'express';
import * as multer from 'multer';
import * as path from 'path';
import * as mime from 'mime-types';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //instância do express
  const expressApp = express();
 
  const storage = multer.diskStorage({
    destination: function(req, file, cb){
      cb(null, '/uploads');
    },
    filename: function(req,file,cb){
  cb(null,file.originalname);
},
  });

  //Define o middleware de upload
  const upload = multer({storage : storage});

   // Define a rota para o upload de arquivos e usa o middleware
   expressApp.post('/upload', upload.single('file'), (req, res) => {
    console.log(req.file);
    res.send('File uploaded successfully!');
  });

  // Usa o middleware do express no app NestJS
  app.use(expressApp);

  

  const configService = app.get(ConfigService);
  const port = +configService.get<number>(SERVER_PORT);

  app.use(cors({origin: 'http://localhost:4200'}));
  app.use(new CorsMiddleware().use);

  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


  await app.listen(port);
  
}
bootstrap();

