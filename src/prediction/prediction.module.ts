import { Module } from '@nestjs/common';
import { PredictionController } from './prediction.controller';
import { PredictionService } from './prediction.service';
import { DatasetService } from 'src/dataset/dataset.service';
import { DatasetModule } from 'src/dataset/dataset.module';

@Module({
  controllers: [PredictionController],
  providers: [PredictionService],
  imports: [DatasetModule]
})
export class PredictionModule {}
