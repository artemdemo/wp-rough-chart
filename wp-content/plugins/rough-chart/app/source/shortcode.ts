import { getChartBaseEl, getChartDataFromEl } from './shortcode/chartElement';

const addRoughChart = (chartId: string|number) => {
    const chartEl = getChartBaseEl(chartId);
    if (chartEl) {
        const chartData = getChartDataFromEl(chartEl);
        console.log(chartData);
    }
};

window['addRoughChart'] = addRoughChart;
