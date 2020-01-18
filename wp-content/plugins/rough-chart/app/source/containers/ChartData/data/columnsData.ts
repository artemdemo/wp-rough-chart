import { TChartColumn, EChartColumnType } from '../chartDataTypes';

export const defaultData: any[][] = [
    ['A', 40],
    ['B', 100],
    ['C', 70],
    ['D', 80],
    ['E', 110],
    ['F', 30],
];

export const columns: TChartColumn[] = [
    { type: 'text', title: 'Label', width: 120 },
    { type: 'text', title: 'Value', width: 120, _valueType: EChartColumnType.number },
];
