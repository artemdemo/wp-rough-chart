import _get from 'lodash/get';

const defaultTranslations = {
    loading: 'Loading...',
    roughCharts: 'Rough Charts',
    addNew: 'Add New',
    created: 'Created',
    edit: 'Edit',
    delete: 'Delete',
    cancel: 'Cancel',
    copy: 'Copy',
    yesDelete: 'Yes, delete',
    deletingChart: '⚠️ Deleting chart',
    areYouSureDelete: 'Are, you sure you want to delete chart?',
    newChart: 'New Chart',
    type: 'Type',
    showLegend: 'Show Legend',
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
    noCharts: 'No charts to display (you should create one :)',
    shortcode: 'Shortcode',
    chartSaved: 'Chart saved',
    chartDeleted: 'Chart deleted',
    chartDataAddRowsHint: 'Right click on the table will allow you to add more rows or delete existing ones.',
    defineChart: 'Define your new chart by filling options below:',
};

export const t = (translationSlug) => {
    return _get(defaultTranslations, translationSlug, translationSlug);
};
