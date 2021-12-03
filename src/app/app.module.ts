import {
  Module,
  DynamicModule,
  NestModule,
  MiddlewareConsumer,
} from '@nestjs/common';
import { BodyParserMiddleware } from '@annio/core/middlewares';
import { IAppConfig } from './interfaces';
import { OrderService } from './services';
import { PaymentService } from './services/payment.service';
import { ClientProxyFactory } from '@nestjs/microservices';
import { PaymentController } from './controllers';

@Module({})
export class AppModule implements NestModule {
  static forRoot(config: IAppConfig): DynamicModule {
    return {
      module: AppModule,
      imports: [],
      controllers: [PaymentController],
      providers: [
        OrderService,
        PaymentService,
        {
          provide: config.services.order.key,
          useFactory: () =>
            ClientProxyFactory.create(config.services.order.config),
        },
      ],
      exports: [OrderService, PaymentService],
    };
  }

  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(BodyParserMiddleware).forRoutes('*');
  }
}
