declare var jQuery;
import { getAppData } from './appData';

export type TAddNewChartResult = {
    inserted_rows: number;
    last_id: number;
};

export const addNewChart = (chartData = {}) => {
    const appData = getAppData();
    return jQuery
        .ajax({
            url: appData.ajax_url,
            type: 'post',
            data: {
                action: 'rough_chart_add_new_chart',
                security: appData.nonce,
                chart: JSON.stringify(chartData),
            }
        });
};

export const updateChart = (chartId: number, chartData = {}) => {
    const appData = getAppData();
    return jQuery
        .ajax({
            url: appData.ajax_url,
            type: 'post',
            data: {
                action: 'rough_chart_update_chart',
                security: appData.nonce,
                chart: JSON.stringify(chartData),
                chart_id: chartId,
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
