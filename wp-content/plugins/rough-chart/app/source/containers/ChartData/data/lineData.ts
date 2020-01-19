import ChartDataColumn, { EChartColumnType } from '../ChartDataColumn';

export const defaultData: any[][] = [
    [5],
    [20],
    [50],
    [70],
    [40],
    [80],
    [90],
    [40],
];

export const columns: ChartDataColumn[] = [
    new ChartDataColumn({
        type: 'text',
        title: 'Value',
        width: 120,
        _valueType: EChartColumnType.number,
    }),
];
