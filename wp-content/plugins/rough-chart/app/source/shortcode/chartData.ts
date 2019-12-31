import { ChartPie } from '../chartTypes';

export const parseChart = (data: string): ChartPie|null => {
    try {
        return JSON.parse(data);
    } catch (e) {
        console.error(e);
    }
    return null;
};
