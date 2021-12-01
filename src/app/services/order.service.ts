import { Injectable, Inject } from '@nestjs/common';
import { BaseService } from '@annio/core/lib/services';
import {
  OrderDTO,
  ORDER_REQUEST_ACTION,
} from '@annio/core/lib/business/order.business';
import { AppConfig } from '@app/config';
import { ClientProxy } from '@nestjs/microservices';
import { ObservableUtils } from '@annio/core/lib/utils';

@Injectable()
export class OrderService extends BaseService {
  constructor(
    @Inject(AppConfig.services.order.key)
    private readonly orderClient: ClientProxy,
  ) {
    super(OrderService.name);
  }

  public async findById(orderId: string): Promise<OrderDTO> {
    const order: OrderDTO = await ObservableUtils.getFirstResponse(
      this.orderClient.send(ORDER_REQUEST_ACTION.GET_BY_ID, orderId),
    );
    return order;
  }
}
