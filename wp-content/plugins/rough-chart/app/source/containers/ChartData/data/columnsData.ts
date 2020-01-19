import ChartDataColumn, { EChartColumnType } from '../ChartDataColumn';

export const defaultData: any[][] = [
    ['A', 40],
    ['B', 100],
    ['C', 70],
    ['D', 80],
    ['E', 110],
    ['F', 30],
];

export const columns: ChartDataColumn[] = [
    new ChartDataColumn({
        type: 'text',
        title: 'Label',
        width: 120,
    }),
    new ChartDataColumn({
        type: 'text',
        title: 'Value',
        width: 120,
        _valueType: EChartColumnType.number,
    }),
];
