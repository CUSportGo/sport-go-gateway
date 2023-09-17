import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { RpcExceptionInterceptor } from './common/rpc-exception.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({});
  app.useGlobalInterceptors(new RpcExceptionInterceptor());
  await app.listen(3000);
}
bootstrap();
