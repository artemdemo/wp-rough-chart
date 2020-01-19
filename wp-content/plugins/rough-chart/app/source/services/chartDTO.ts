import _isArray from 'lodash/isArray'
import _get from 'lodash/get'
import { TChartTable } from '../chartTypes';
import {EChartColumnType, TChartColumn} from '../containers/ChartData/chartDataTypes';

export type TJExcel = any[][];

export const fromJExcelToData = (jExcel: TJExcel, columns: TChartColumn[]): TChartTable => {
    const result: TChartTable = {};
    if (_isArray(jExcel)) {
        jExcel.forEach((row) => {
            for (let i = 0; i < columns.length; i++) {
                const columnDefinition = columns[i];
                const label = columnDefinition.title.toLowerCase();
                const itemRaw = _get(row, `[${i}]`, '');
                const isNum = columnDefinition._valueType === EChartColumnType.number;
                const item = isNum && itemRaw !== '' ? parseFloat(itemRaw) : itemRaw;
                if (result.hasOwnProperty(label)) {
                    result[label].push(item);
                } else {
                    result[label] = [ item ];
                }
            }
        });
    }
    return result;
};

export const fromDataToJExcel = (data?: TChartTable): TJExcel => {
    const result: TJExcel = [];
    if (data) {
        const keysList = Object.keys(data);
        const lengthArgs: number[] = keysList.reduce((acc, key) => {
            return [
                ...acc,
                data[key].length,
            ];
        }, []);
        const maxLength = Math.max(...lengthArgs);
        for (let i = 0; i < maxLength; i++) {
            const row: any[] = [];
            keysList.forEach((key) => {
                row.push(_get(data, `[key][${i}]`, ''));
            });
            result.push(row);
        }
    }
    return result;
};
