import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as firebase from 'firebase/app';
// You don't need to import firebase/app either since it's being imported above
import 'firebase/auth';
import 'firebase/firestore';
async function bootstrap() {

admin.initializeApp({
  credential: admin.credential.cert(DB_ CREDENTIALS),
})   
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,DELETE,OPTIONS',
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
