import { getChartBaseEl, getChartDataFromEl } from './shortcode/chartElement';

const __addRoughChart = (chartId: string|number) => {
    const chartEl = getChartBaseEl(chartId);
    if (chartEl) {
        const chartData = getChartDataFromEl(chartEl);
        console.log(chartData);
    }
};

window['__addRoughChart'] = __addRoughChart;
