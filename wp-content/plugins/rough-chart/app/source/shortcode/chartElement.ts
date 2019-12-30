export const getChartBaseEl = (chartId: string|number): HTMLDivElement|null => {
    const chartEls = document.getElementsByClassName(`rough-chart-${chartId}`);
    if (chartEls.length > 0) {
        return <HTMLDivElement> chartEls[0];
    }
    return null;
};

type ChartPie = {
    fillStyle: string;
    strokeWidth: number;
    fillWeight: number;
    roughness: number;
    xLabel: string;
    yLabel: string;
    data: [string, number, string][];
};

type Chart = {
    id: number;
    title: string;
    type: string;
    chart: ChartPie;
};

type ChartElDataset = {
    roughchart: string|null;
    title: string|null;
    type: string|null;
    chart: string|null;
};

export const getChartDataFromEl = (el: HTMLDivElement): Chart|null => {
    const attributesList = [ 'roughchart', 'title', 'type', 'chart' ];
    const dataset = <ChartElDataset> attributesList.reduce((acc, item) => {
        acc[item] = el.getAttribute(`data-${item}`);
        return acc;
    }, {});
    try {
        if (dataset.roughchart && dataset.title && dataset.type && dataset.chart) {
            return {
                id: parseInt(dataset.roughchart, 10),
                title: dataset.title,
                type: dataset.type,
                chart: JSON.parse(dataset.chart),
            };
        } else {
            console.error(JSON.stringify(dataset, null, 2));
            throw new Error('Chart data is missing');
        }
    } catch (e) {
        console.error(e);
    }
    return null;
};
