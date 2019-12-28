import queryString from 'query-string';
import urlParse from 'url-parse';
import ChartTypes from '../containers/chartTypes';

const globalAppDataRef = '__roughChartsApp_$8453';

type AppData = {
    nonce: string;
    ajax_url: string;
    plugin_url: string;
    build_folder: string;
}

export const getAppData = (): AppData => {
    return window[globalAppDataRef];
};

export const getUrlToChart = (chartId: string, type?: ChartTypes) => {
    const appData = getAppData();
    const parsedUrl = urlParse(appData.plugin_url);
    const query = {
        ...queryString.parse(parsedUrl.query),
        chart_id: chartId,
        type,
    };
    return `${parsedUrl.origin}${parsedUrl.pathname}?${queryString.stringify(query)}`;
};
