import _isArray from 'lodash/isArray'
import _get from 'lodash/get'
import { TChartTable } from '../chartTypes';

export type TJExcel = any[][];

export const fromJExcelToGeneralLine = (jExcel?: TJExcel): TChartTable => {
    const labels: string[] = [];
    const values: number[] = [];

    if (jExcel && _isArray(jExcel)) {
        jExcel.forEach((item) => {
            labels.push(_get(item, '[0]', ''));
            values.push(_get(item, '[1]', ''));
        });
    }

    return {
        labels,
        values,
    };
};

export const fromGeneralLineToJExcel = (pieData?: TChartTable): TJExcel => {
    const result: TJExcel = [];
    if (pieData) {
        const length = Math.max(
            pieData.labels.length,
            pieData.values.length,
        );
        for (let i = 0; i < length; i++) {
            const row = [
                _get(pieData, `labels[${i}]`, ''),
                _get(pieData, `values[${i}]`, ''),
            ];
            result.push(row);
        }
    }
    return result;
};

export const fromJExcelToPie = (jExcel?: TJExcel): TChartTable => {
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

export const fromPieToJExcel = (pieData?: TChartTable): TJExcel => {
    const result: TJExcel = [];
    if (pieData) {
        const length = Math.max(
            pieData.labels.length,
            pieData.values.length,
            _get(pieData, 'colors.length', 0),
        );
        for (let i = 0; i < length; i++) {
            const row = [
                _get(pieData, `labels[${i}]`, ''),
                _get(pieData, `values[${i}]`, ''),
            ];
            if (_isArray(pieData.colors)) {
                row.push(_get(pieData, `colors[${i}]`, ''));
            }
            result.push(row);
        }
    }
    return result;
};
