import { NestFactory } from '@nestjs/core';
import { FunnelModule } from './funnel.module';
import { WsAdapter } from '@nestjs/platform-ws';

async function bootstrap() {
  const app = await NestFactory.create(FunnelModule);
  app.useWebSocketAdapter(new WsAdapter(app));
  app.enableCors();
  await app.listen(8000);
}
bootstrap();
