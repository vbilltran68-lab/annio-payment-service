import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { BaseController } from '@annio/core/controllers';
import {
  PAYMENT_STATUS,
  PAYMENT_REQUEST_ACTION,
} from '@annio/core/business/payment/payment.common';
import { ProcessOrderPaymentDTO } from '@annio/core/business/payment/payment.dto';
import { PaymentService } from '@app/services/payment.service';

@Controller()
export class PaymentController extends BaseController {
  constructor(private readonly paymentService: PaymentService) {
    super(PaymentController.name);
  }

  @MessagePattern(PAYMENT_REQUEST_ACTION.VERIFY)
  async verify(
    @Payload() payload: ProcessOrderPaymentDTO,
    @Ctx() context: RmqContext,
  ): Promise<PAYMENT_STATUS> {
    this.logger.log(PAYMENT_REQUEST_ACTION.VERIFY, context.getPattern());
    return await this.paymentService.verify(payload);
  }
}
