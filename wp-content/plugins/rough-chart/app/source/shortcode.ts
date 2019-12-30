import roughViz from 'rough-viz';
import { parseChart } from './shortcode/chartData';

type ChartData = {
    id: number;
    className: string;
    title: string;
    type: string;
    chart: string;
};

const __addRoughChart = (chartInput: ChartData) => {
    const chartOptions = parseChart(chartInput.chart);
    if (chartOptions) {
        new roughViz.Pie({
            element: '.' + chartInput.className,
            title: chartInput.title,
            fillStyle: chartOptions.fillStyle,
            fillWeight: chartOptions.fillWeight,
            roughness: chartOptions.roughness,
            strokeWidth: chartOptions.strokeWidth,
            data: {labels: ['a', 'b'], values: [10, 20]}
        });
    }
};

window['__addRoughChart'] = __addRoughChart;
