import { Injectable } from '@nestjs/common';
import { BaseService } from '@annio/core/lib/services';
import {
  PAYMENT_STATUS,
  ProcessOrderPaymentDTO,
} from '@annio/core/lib/business/payment.business';
import { OrderService } from './order.service';

@Injectable()
export class PaymentService extends BaseService {
  constructor(private readonly orderService: OrderService) {
    super(PaymentService.name);
  }

  public async verify(
    payload: ProcessOrderPaymentDTO,
  ): Promise<PAYMENT_STATUS> {
    // verify order
    const order = await this.orderService.findById(payload.orderId);
    if (!order) {
      this.logger.error(`order not found: ${payload.orderId}`);
      return PAYMENT_STATUS.DECLINED;
    }

    const isConfirmLogic = Math.random() < 0.5; // 50%
    // TODO: apply OTP another logic

    return isConfirmLogic ? PAYMENT_STATUS.CONFIRMED : PAYMENT_STATUS.DECLINED;
  }
}
