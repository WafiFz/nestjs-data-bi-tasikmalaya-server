import { Injectable } from '@nestjs/common';
import { DatasetService } from 'src/dataset/dataset.service';
import { convertDataToChart } from 'src/dataset/dataset.util';
import { datasetPrediction } from './data/inflation-prediction';
import {
  getData,
  getLabelsAfterDate,
  getSeriesByName,
  getSliceOfData,
} from './prediction.util';

@Injectable()
export class PredictionService {
  constructor(private readonly datasetService: DatasetService) {}

  async getPredictInflation(
    qty: number,
    nameSeries = 'Tasikmalaya.mtm - rhs',
  ) {
    const datasetSlug = 'inflasi';

    const dataset = await this.datasetService.getDatasetBySlug(datasetSlug);

    const actualDataset = convertDataToChart(dataset);
    const actualSeries = getSeriesByName(actualDataset, nameSeries);
    const actualLabels = actualDataset.labels;
    const lastActualDate = actualLabels[actualLabels.length - 1];

    const predictionDataset = convertDataToChart(datasetPrediction);
    const predictionSeries = getSeriesByName(predictionDataset, nameSeries);

    const filteredPredictionLabels = getLabelsAfterDate(
      predictionDataset.labels,
      lastActualDate,
    );

    const filteredPredictionData = getSliceOfData(
      predictionSeries.data,
      filteredPredictionLabels,
    );

    const finalPredictionLabel = filteredPredictionLabels.slice(0, qty);
    const finalPredictionData = filteredPredictionData.slice(0, qty);

    const series = [
      {
        name: 'Tasikmalaya',
        type: 'line',
        data: getData(actualSeries.data, finalPredictionData, 'actual'),
      },
      {
        name: 'Prediksi Tasikmalaya',
        type: 'line',
        data: getData(actualSeries.data, finalPredictionData, 'prediction'),
      },
    ];

    const dashArray = [0, 5];

    const width = [3, 3];

    const combinedLabels = [...actualLabels, ...finalPredictionLabel];

    return {
      title: 'Inflasi -' + nameSeries,
      dashArray: dashArray,
      width: width,
      series: series,
      labels: combinedLabels,
    };
  }
}
