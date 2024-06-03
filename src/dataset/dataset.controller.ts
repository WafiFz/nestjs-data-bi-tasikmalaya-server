// src/dataset/dataset.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { DatasetService } from './dataset.service';
import { CreateDatasetDto } from './dto/dataset.dto';
import { ApiTags, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { Dataset } from './dataset.schema';

@ApiTags('datasets')
@Controller('datasets')
export class DatasetController {
  constructor(private readonly datasetService: DatasetService) {}

  @Get()
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    description: 'Page number',
    example: 1,
  })
  @ApiQuery({
    name: 'itemPerPage',
    type: Number,
    required: false,
    description: 'Items per page',
    example: 10,
  })
  @ApiResponse({
    status: 200,
    description: 'Returns all datasets with pagination',
  })
  async getAllDatasets(
    @Query('page') page?: number,
    @Query('itemPerPage') itemPerPage?: number,
  ): Promise<{ datasets: Dataset[]; totalDatasets: number }> {
    const pageNumber = page || 1;
    const itemsPerPage = itemPerPage || 10;
    return this.datasetService.getAllDatasets(pageNumber, itemsPerPage);
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Returns a single dataset' })
  async getDatasetById(@Param('id') id: string): Promise<Dataset> {
    return this.datasetService.getDatasetById(id);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Creates a new dataset' })
  async createDataset(
    @Body() createDatasetDto: CreateDatasetDto,
  ): Promise<Dataset> {
    return this.datasetService.createDataset(createDatasetDto);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Updates an existing dataset' })
  async updateDataset(
    @Param('id') id: string,
    @Body() updateDatasetDto: CreateDatasetDto,
  ): Promise<Dataset> {
    return this.datasetService.updateDataset(id, updateDatasetDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Deletes an existing dataset' })
  async deleteDataset(@Param('id') id: string): Promise<Dataset> {
    return this.datasetService.deleteDataset(id);
  }
}
