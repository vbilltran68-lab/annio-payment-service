import { IAppConfig } from '@app/interfaces';
import { Transport } from '@nestjs/microservices';
import { readFileSync } from 'fs';
import * as path from 'path';

export const AppConfig: IAppConfig = {
  project: {
    package: loadRootJson('package.json'),
  },
  env: {
    name: process.env.NODE_ENV || 'development',
    microserviceOptions: {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.SERVICE_PAYMENT_RMQ_URL],
        queue: process.env.SERVICE_PAYMENT_RMQ_QUEUE,
        queueOptions: {
          durable: false,
        },
      },
    },
  },
  services: {
    order: {
      key: 'ORDER_SERVICE',
      config: {
        transport: Transport.RMQ,
        options: {
          urls: [process.env.SERVICE_ORDER_RMQ_URL],
          queue: process.env.SERVICE_ORDER_RMQ_QUEUE,
          queueOptions: {
            durable: false,
          },
        },
      },
    },
  },
};

export function getRootPath() {
  return __dirname + './../../../';
}

export function resolveRootFile(fileName: string) {
  return path.resolve(__dirname, getRootPath(), fileName);
}

export function loadRootJson<T = any>(fileName: string) {
  return JSON.parse(readFileSync(resolveRootFile(fileName)).toString()) as T;
}
