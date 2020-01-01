import queryString from 'query-string';

export type QueryParams = {
    chart_id?: string;
    type?: string;
};

export const getQuery = (): QueryParams => queryString.parse(location.search);

/**
 * Push state tp the global window object and emit event, so router could rerender.
 * @param url {string}
 * @param title {string}
 * @param data {*}
 */
export const pushState = (url, title = '', data = null) => {
    window.history.pushState(
        data,
        title,
        url,
    );
};
