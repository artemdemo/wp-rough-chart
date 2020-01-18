import { TChartColumn, EChartColumnType } from '../chartDataTypes';

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

export const columns: TChartColumn[] = [
    {
        type: 'text',
        title: 'Value',
        width: 120,
        _valueType: EChartColumnType.number,
    },
];
