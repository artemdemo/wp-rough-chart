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

export const getChartsData = () => {
    const appData = getAppData();
    return jQuery
        .ajax({
            url: appData.ajax_url,
            type: 'post',
            data: {
                action: 'rough_chart_get_charts_data',
                security: appData.nonce,
            }
        });
};
