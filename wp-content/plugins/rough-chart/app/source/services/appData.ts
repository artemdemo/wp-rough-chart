import queryString from 'query-string';
import urlParse from 'url-parse';

const globalAppDataRef = '__roughChartsApp_$8453';

export const getAppData = () => {
    return window[globalAppDataRef];
};

export const getUrlToChart = (chartId: string) => {
    const appData = getAppData();
    const parsedUrl = urlParse(appData.plugin_url);
    const query = {
        ...queryString.parse(parsedUrl.query),
        chart_id: chartId,
    };
    return `${parsedUrl.origin}${parsedUrl.pathname}?${queryString.stringify(query)}`;
};
