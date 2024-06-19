import { Module } from '@nestjs/common';
import { DatasetController } from './dataset.controller';
import { DatasetService } from './dataset.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Dataset, DatasetSchema } from './dataset.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Dataset.name, schema: DatasetSchema }])],
  controllers: [DatasetController],
  providers: [DatasetService],
  exports: [DatasetService],
})
export class DatasetModule {}
