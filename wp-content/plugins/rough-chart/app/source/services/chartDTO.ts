import _isArray from 'lodash/isArray'
import _get from 'lodash/get'
import { IChartPieTable } from '../chartTypes';

export type TJExcel = any[][];

export const fromJExcelToPie = (jExcel?: TJExcel): IChartPieTable => {
    const labels: string[] = [];
    const values: number[] = [];
    const colors: string[] = [];

    if (jExcel && _isArray(jExcel)) {
        jExcel.forEach((item) => {
            labels.push(_get(item, '[0]', ''));
            values.push(_get(item, '[1]', ''));
            colors.push(_get(item, '[2]', ''));
        });
    }

    return {
        labels,
        values,
        colors,
    };
};

export const fromPieToJExcel = (pieData?: IChartPieTable): TJExcel => {
    const result: TJExcel = [];
    if (pieData) {
        const length = Math.max(
            pieData.labels.length,
            pieData.values.length,
            pieData.colors.length,
        );
        for (let i = 0; i < length; i++) {
            result.push([
                _get(pieData, `labels[${i}]`, ''),
                _get(pieData, `values[${i}]`, ''),
                _get(pieData, `colors[${i}]`, ''),
            ]);
        }
    }
    return result;
};
