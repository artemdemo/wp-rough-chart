declare var jQuery;
import { getAppData } from './appData';

export const saveChartData = (chartData = {}) => {
    const appData = getAppData();
    return jQuery
        .ajax({
            url: appData.ajax_url,
            type: 'post',
            data: {
                action: 'rough_chart_save_chart_data',
                security: appData.nonce,
                chart: JSON.stringify(chartData),
            }
        });
};

export const getAllChart = () => {
    const appData = getAppData();
    return jQuery
        .ajax({
            url: appData.ajax_url,
            type: 'post',
            data: {
                action: 'rough_chart_get_all_charts',
                security: appData.nonce,
            }
        });
};

export const getChartById = (chartId: number) => {
    const appData = getAppData();
    return jQuery
        .ajax({
            url: appData.ajax_url,
            type: 'post',
            data: {
                action: 'rough_chart_get_chart_by_id',
                security: appData.nonce,
                chart_id: chartId,
            }
        });
};

export const deleteChart = (chartId: number) => {
    const appData = getAppData();
    return jQuery
        .ajax({
            url: appData.ajax_url,
            type: 'post',
            data: {
                action: 'rough_chart_delete_chart',
                security: appData.nonce,
                chart_id: chartId,
            }
        });
};
