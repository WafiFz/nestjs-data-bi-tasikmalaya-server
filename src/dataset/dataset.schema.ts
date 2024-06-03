// src/dataset/dataset.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Dataset extends Document {
  @Prop()
  title: string;

  @Prop()
  slug: string;

  @Prop()
  description: string;

  @Prop()
  source: string;

  @Prop({ type: MongooseSchema.Types.Mixed })
  content: any;

  @Prop()
  created_at: Date;

  @Prop()
  updated_at: Date;
}

export const DatasetSchema = SchemaFactory.createForClass(Dataset);
