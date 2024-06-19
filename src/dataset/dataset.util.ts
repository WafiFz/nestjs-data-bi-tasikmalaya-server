export interface Column {
  field: string;
  metadata: {
    isSeries: boolean;
    isLabels: boolean;
    unit?: string;
  };
}

interface Data {
  series: {
    name: string;
    type: string;
    unit: string;
    data: number[];
  }[];
  labels: string[];
}

export function convertDataToChart(data: any) {
  const columns = data.content.columns as Column[];
  const seriesColumns = columns.filter(
    (column) => column.metadata && column.metadata.isSeries,
  );
  const labelColumns = columns.filter(
    (column) => column.metadata && column.metadata.isLabels,
  );

  const series: Data['series'] = seriesColumns.map((column) => ({
    name: column.field,
    type: 'line',
    unit: column.metadata.unit || '',
    data: data.content.rows.map(
      (row: { [x: string]: any }) => row[column.field],
    ),
  }));

  const labels: Data['labels'] = data.content.rows.map(
    (row: { [x: string]: any }) =>
      labelColumns.map((column) => row[column.field]).join(' - '),
  );

  return {
    series,
    labels,
  };
}
