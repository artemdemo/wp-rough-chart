import roughViz from 'rough-viz';
import { parseChart } from './shortcode/chartData';
import { TChartShortcode } from './chartTypes';
import { ELegendTypes } from './containers/formProps/Legend';

const __addRoughChart = (chartInput: TChartShortcode) => {
    const chartOptions = parseChart(chartInput.chart);
    if (chartOptions && chartOptions.data) {
        const legendTypeNum = parseInt(chartOptions.legend, 10);
        new roughViz.Pie({
            element: '.' + chartInput.className,
            title: chartInput.title,
            fillStyle: chartOptions.fillStyle,
            fillWeight: chartOptions.fillWeight,
            roughness: chartOptions.roughness,
            strokeWidth: chartOptions.strokeWidth,
            legend: legendTypeNum !== ELegendTypes.hidden,
            legendPosition: legendTypeNum === ELegendTypes.left ? 'left' : 'right',
            colors: chartOptions.data.colors,
            data: {
                labels: chartOptions.data.labels,
                values: chartOptions.data.values,
            },
        });
    }
};

window['__addRoughChart'] = __addRoughChart;
