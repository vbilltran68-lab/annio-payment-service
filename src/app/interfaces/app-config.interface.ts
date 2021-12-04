import { IMicroServiceConfig } from '@annio/core/interfaces';
import { MicroserviceOptions } from '@nestjs/common/interfaces/microservices/microservice-configuration.interface';
import { NestMicroserviceOptions } from '@nestjs/common/interfaces/microservices/nest-microservice-options.interface';

export interface IAppConfig {
  project: {
    package: any;
  };
  env: {
    name: string;
    microserviceOptions: NestMicroserviceOptions & MicroserviceOptions;
  };
  services: {
    order: IMicroServiceConfig;
  };
}
