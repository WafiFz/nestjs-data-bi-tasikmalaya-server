// src/dataset/dataset.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Dataset } from './dataset.schema';
import { CreateDatasetDto } from './dto/dataset.dto';

@Injectable()
export class DatasetService {
  constructor(
    @InjectModel(Dataset.name) private readonly datasetModel: Model<Dataset>,
  ) {}

  async getAllDatasets(page: number, itemsPerPage: number) {
    const datasets = await this.datasetModel
      .find()
      .skip((page - 1) * itemsPerPage)
      .limit(itemsPerPage)
      .exec();
    const totalDatasets = await this.datasetModel.countDocuments();
    return { datasets, totalDatasets };
  }

  async getDatasetById(id: string) {
    const dataset = await this.datasetModel.findById(id).exec();
    if (!dataset) {
      throw new NotFoundException('Dataset not found');
    }
    return dataset;
  }

  async getDatasetBySlug(slug: string) {
    const dataset = await this.datasetModel.findOne({ slug }).exec();
    if (!dataset) {
      throw new NotFoundException('Dataset not found');
    }
    return dataset;
  }

  async createDataset(createDatasetDto: CreateDatasetDto) {
    const dataset = {
      ...createDatasetDto,
      created_at: new Date(),
    };
    const createdDataset = new this.datasetModel(dataset);
    return createdDataset.save();
  }

  async updateDataset(id: string, updateDatasetDto: CreateDatasetDto) {
    const existingDataset = await this.datasetModel.findByIdAndUpdate(
      id,
      updateDatasetDto,
      { new: true },
    );
    if (!existingDataset) {
      throw new NotFoundException('Dataset not found');
    }
    return existingDataset;
  }

  async deleteDataset(id: string) {
    const deletedDataset = await this.datasetModel.findByIdAndDelete(id);
    if (!deletedDataset) {
      throw new NotFoundException('Dataset not found');
    }
    return deletedDataset;
  }
}
