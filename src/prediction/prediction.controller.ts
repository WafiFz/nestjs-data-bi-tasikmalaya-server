import { Controller, Get, HttpException, Param, Query } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PredictionService } from './prediction.service';

@ApiTags('prediction')
@Controller('prediction')
export class PredictionController {
  constructor(private readonly predictionService: PredictionService) {}

  @Get('inflation/tasikmalaya/:path')
  @ApiOkResponse({
    description: 'Returns prediction inflation of Tasikmalaya',
  })
  @ApiQuery({
    name: 'qty',
    type: Number,
    required: false,
    description: 'qty: Quantity of Prediction',
    example: 12,
  })
  @ApiParam({
    name: 'path',
    type: String,
    required: true,
    description: 'Path parameter (e.g. mtm)',
    example: 'mtm',
  })
  @ApiResponse({
    status: 404,
    description: 'Path not found',
  })
  async getPredictInflationTasik(
    @Param('path') path: string,
    @Query('qty') qty?: number,
  ): Promise<any> {
    try {
      const qtyPrediction = qty || 12;

      let nameSeries = '';

      if (path === 'mtm') {
        nameSeries = 'Tasikmalaya.mtm - rhs';
      } else if (path === 'yoy') {
        nameSeries = 'Tasikmalaya.yoy';
      } else {
        throw new HttpException('Not Found', 404);
      }

      return this.predictionService.getPredictInflation(
        qtyPrediction,
        nameSeries,
      );
    } catch (error) {
      return error;
    }
  }

  @Get('inflation/tasikmalaya/yoy')
  @ApiQuery({
    name: 'qty',
    type: Number,
    required: false,
    description: 'qty: Quantity of Prediction',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Returns prediction inflation - yoy of Tasikmalaya',
  })
  async getPredictInflationTasikYOY(@Query('qty') qty?: number): Promise<any> {
    const qtyPrediction = qty || 24;
    return this.predictionService.getPredictInflation(
      qtyPrediction,
      'Tasikmalaya.yoy',
    );
  }
}
