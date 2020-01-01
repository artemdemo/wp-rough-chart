import { TChartPie } from '../chartTypes';

export const parseChart = (data: string): TChartPie|null => {
    try {
        return JSON.parse(data);
    } catch (e) {
        console.error(e);
    }
    return null;
};
