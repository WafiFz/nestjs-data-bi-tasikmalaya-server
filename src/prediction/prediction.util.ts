export function fillWithNone(
  data: any[],
  totalLength: number,
  atEnd: boolean = true,
): any[] {
  /**
   * Fills the data with None values at the end or the beginning.
   *
   * @param data The list of data points.
   * @param totalLength The total length of the resulting list after filling.
   * @param atEnd If True, fills None values at the end. If False, fills None values at the beginning.
   * @returns A new list with None values filled at the specified position.
   */
  const fillLength = totalLength - data.length;
  if (fillLength < 0) {
    throw new Error(
      'Total length must be greater than or equal to the length of the data',
    );
  }

  const noneFill = new Array(fillLength).fill(null);
  return atEnd ? [...data, ...noneFill] : [...noneFill, ...data];
}

export function calculateTotalLength(
  originalData: any[],
  predictionData: any[],
): number {
  /**
   * Calculates the total length needed for padding.
   *
   * @param originalData The list of original data points.
   * @param predictionData The list of prediction data points.
   * @returns The total length needed to combine the original and prediction data.
   */
  return originalData.length + predictionData.length;
}

export function getData(
  actualData: any[],
  predictionData: any[],
  dataType: string = 'actual',
): any[] {
  /**
   * Prepares the series data for actual and prediction values.
   *
   * @param actualData The list of actual data points.
   * @param predictionData The list of prediction data points.
   * @param dataType The type of data, either 'actual' or 'prediction'.
   * @returns A list of dictionaries representing the series data.
   */
  const totalLength = calculateTotalLength(actualData, predictionData);

  if (dataType === 'actual') {
    return fillWithNone(actualData, totalLength, true);
  }

  return fillWithNone(predictionData, totalLength, false);
}

export function getSeriesByName(dataset, name) {
  return dataset.series.find((series) => series.name === name);
}

export function getLabelsAfterDate(labels, date) {
  return labels.filter((label) => label > date);
}

export function getSliceOfData(data, labels) {
  const startIndex = labels[0];
  return data.slice(startIndex);
}
