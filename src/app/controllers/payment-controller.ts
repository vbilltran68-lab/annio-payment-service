import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  TcpContext,
} from '@nestjs/microservices';
import { BaseController } from '@annio/core/lib/controllers';
import {
  PAYMENT_REQUEST_ACTION,
  PAYMENT_STATUS,
  ProcessOrderPaymentDTO,
} from '@annio/core/lib/business/payment.business';
import { PaymentService } from '@app/services/payment.service';

@Controller()
export class PaymentController extends BaseController {
  constructor(private readonly paymentService: PaymentService) {
    super(PaymentController.name);
  }

  @MessagePattern(PAYMENT_REQUEST_ACTION.VERIFY)
  async verify(
    @Payload() payload: ProcessOrderPaymentDTO,
    @Ctx() context: TcpContext,
  ): Promise<PAYMENT_STATUS> {
    this.logger.log(PAYMENT_REQUEST_ACTION.VERIFY, context.getPattern());
    return await this.paymentService.verify(payload);
  }
}
