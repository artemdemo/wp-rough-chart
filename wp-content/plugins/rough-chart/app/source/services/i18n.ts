import _get from 'lodash/get';

const defaultTranslations = {
    roughCharts: 'Rough Charts',
    addNew: 'Add New',
    created: 'Created',
    edit: 'Edit',
    delete: 'Delete',
    newChart: 'New Chart',
    lastUpdated: 'Last updated',
    roughChartsList: 'Rough Charts list',
    newPieChart: 'New Pie Chart',
    newBarChart: 'New Bar Chart',
    newChartOptions: 'New Rough Chart options',
    createNewChart: 'Create new chart',
    title: 'Title',
    fillStyle: 'Fill Style',
    strokeWidth: 'Stroke Width',
    fillWeight: 'Fill Weight',
    fillWeightDescription: "Weight of inner paths' color. Default: 0.5.",
    roughness: 'Roughness',
    roughnessDescription: 'Roughness level of chart. Default: 1.',
    xLabel: 'X Label',
    xLabelDescription: 'Label for x-axis.',
    yLabel: 'Y Label',
    yLabelDescription: 'Label for y-axis.',
    chartData: 'Chart Data',
    chartDataAddRowsHint: 'Rich click on the table will allow you to add more rows or delete existing ones.',
    defineChart: 'Define your new chart by filling options below:',
};

export const t = (translationSlug) => {
    return _get(defaultTranslations, translationSlug, translationSlug);
};
