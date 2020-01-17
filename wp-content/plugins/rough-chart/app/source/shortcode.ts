import roughViz from 'rough-viz';
import { parseChart } from './shortcode/chartData';
import { TChartShortcode, TChartTypes } from './chartTypes';
import { ELegendTypes } from './containers/formProps/Legend';

type TRoughVizSettings = {
    element: string;
    title: string;
    fillWeight: number;
    roughness: number;
    strokeWidth: number;
    legend: boolean;
    legendPosition: string;
    data: {
        labels: string[];
        values: string[]|number[];
    };
    color?: string;
    colors?: string[];
    fillStyle?: string;
};

const __addRoughChart = (chartInput: TChartShortcode) => {
    const chartOptions = parseChart(chartInput.chart);

    if (chartOptions && chartOptions.data) {
        const legendTypeNum = parseInt(chartOptions.legend, 10);
        const roughVizSettings: TRoughVizSettings = {
            element: '.' + chartInput.className,
            title: chartInput.title,
            fillWeight: chartOptions.fillWeight,
            roughness: chartOptions.roughness,
            strokeWidth: chartOptions.strokeWidth,
            legend: legendTypeNum !== ELegendTypes.hidden,
            legendPosition: legendTypeNum === ELegendTypes.left ? 'left' : 'right',
            data: {
                labels: chartOptions.data.labels,
                values: chartOptions.data.values,
            },
        };

        if (TChartTypes[chartInput.chart_type] === TChartTypes.pie) {
            roughVizSettings.fillStyle = chartOptions.fillStyle;
            roughVizSettings.colors = chartOptions.data.colors;
            new roughViz.Pie(roughVizSettings);
        }

        if (TChartTypes[chartInput.chart_type] === TChartTypes.bars) {
            roughVizSettings.fillStyle = chartOptions.fillStyle;
            roughVizSettings.color = chartOptions.color;
            new roughViz.BarH(roughVizSettings);
        }

        if (TChartTypes[chartInput.chart_type] === TChartTypes.columns) {
            roughVizSettings.fillStyle = chartOptions.fillStyle;
            roughVizSettings.color = chartOptions.color;
            new roughViz.Bar(roughVizSettings);
        }

        if (TChartTypes[chartInput.chart_type] === TChartTypes.lines) {
            roughVizSettings.color = chartOptions.color;
            new roughViz.Line(roughVizSettings);
        }
    }
};

window['__addRoughChart'] = __addRoughChart;
