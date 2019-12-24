import _get from 'lodash/get';

const defaultTranslations = {
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
    defineChart: 'Define your new chart by filling options below:',
};

export const t = (translationSlug) => {
    return _get(defaultTranslations, translationSlug, translationSlug);
};