import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as admin from "firebase-admin";
import { fsReadFile } from "ts-loader/dist/utils";
import * as path from 'path'


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const serviceAccount = fsReadFile(path.join(__dirname, '../src/service-account.json'), 'utf-8')
  const json = JSON.parse(serviceAccount);
  admin.initializeApp({
    credential: admin.credential.cert(json)
  });

  app.enableCors({
    allowedHeaders: "*",
    origin: "*"
  });

  const options = new DocumentBuilder()
    .setTitle('We Propel API')
    .setDescription('') //TODO: DEFINE API DESCRIPTION
    .setVersion('0.0.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3333);
}
bootstrap();
