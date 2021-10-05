"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = void 0;
const app_module_1 = require("./user.resource/app.module");
const core_1 = require("@nestjs/core");
async function bootstrap() {
    var admin = require('firebase-admin');
    var serviceAccount = require('../../my-key.json');
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: true,
        methods: 'GET,HEAD,PUT,PATCH,DELETE,OPTIONS',
        credentials: true,
    });
    await app.listen(3000);
}
exports.bootstrap = bootstrap;
bootstrap();
//# sourceMappingURL=main.js.map