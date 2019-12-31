import roughViz from 'rough-viz';
import { parseChart } from './shortcode/chartData';
import { ChartShortcode } from './chartTypes';

const __addRoughChart = (chartInput: ChartShortcode) => {
    const chartOptions = parseChart(chartInput.chart);
    if (chartOptions) {
        new roughViz.Pie({
            element: '.' + chartInput.className,
            title: chartInput.title,
            fillStyle: chartOptions.fillStyle,
            fillWeight: chartOptions.fillWeight,
            roughness: chartOptions.roughness,
            strokeWidth: chartOptions.strokeWidth,
            legend: chartOptions.legend,
            data: {labels: ['a', 'b'], values: [10, 20]}
        });
    }
};

window['__addRoughChart'] = __addRoughChart;
