import { TChartColumn, EChartColumnType } from '../chartDataTypes';

export const defaultData: any[][] = [
    ['A', 40, '#2196f3'],
    ['B', 100, '#66bb6a'],
    ['C', 70, '#ff9800'],
];

export const columns: TChartColumn[] = [
    { type: 'text', title: 'Label', width: 120 },
    { type: 'text', title: 'Value', width: 120, _valueType: EChartColumnType.number },
    { type: 'color', title: 'Fill', width: 100, render: 'square' },
];
