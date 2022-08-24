import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Productsmodule } from './products/products.module';
@Module({
  imports: [Productsmodule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
