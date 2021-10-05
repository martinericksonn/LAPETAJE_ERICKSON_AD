import { AppModule } from './user.resource/app.module';
import { NestFactory } from '@nestjs/core';
import * as admin from 'firebase-admin';

export async function bootstrap() {
  var admin = require('firebase-admin');
  var serviceAccount = require('../../my-key.json');

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,DELETE,OPTIONS',
    credentials: true,
  });
  await app.listen(3000);
}

bootstrap();
