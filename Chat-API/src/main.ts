import { NestFactory } from '@nestjs/core';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import * as express from 'express';
import * as functions from 'firebase-functions';
import { AppModule } from './user.resource/app.module';
import * as admin from 'firebase-admin';

const server: express.Express = express();
export const createNestServer = async (expressInstance: express.Express) => {
  const adapter = new ExpressAdapter(expressInstance);
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    adapter,
    {},
  );
  app.enableCors();
  return app.init();
};
export async function bootstrap() {
  var admin = require('firebase-admin');

  var serviceAccount = require('./app.key.json');

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

bootstrap();

createNestServer(server)
  .then((v) => console.log('Nest Ready'))
  .catch((err) => console.error('Nest broken', err));
export const api: functions.HttpsFunction = functions.https.onRequest(server);

// import { AppModule } from './user.resource/app.module';
// import { NestFactory } from '@nestjs/core';
// import * as admin from 'firebase-admin';

// export async function bootstrap() {
//   var admin = require('firebase-admin');

//   var serviceAccount = require('../../my-key.json');

//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//   });

//   const app = await NestFactory.create(AppModule);

//   app.enableCors({
//     origin: true,
//     methods: 'GET,HEAD,PUT,PATCH,DELETE,OPTIONS',
//     credentials: true,
//   });
//   await app.listen(3000);
// }

// bootstrap();
