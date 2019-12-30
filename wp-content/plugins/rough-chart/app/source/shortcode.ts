import { getChartBaseEl, getChartDataFromEl } from './shortcode/baseElement';

const addRoughChart = (chartId: string|number) => {
    const chartEl = getChartBaseEl(chartId);
    if (chartEl) {
        const chartData = getChartDataFromEl(chartEl);
        console.log(chartData);
    }
};

window['addRoughChart'] = addRoughChart;
