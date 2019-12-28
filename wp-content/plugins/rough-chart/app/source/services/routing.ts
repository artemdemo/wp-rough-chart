import queryString from 'query-string';

export type QueryParams = {
    chart_id?: string;
    type?: string;
};

export const getQuery = (): QueryParams => queryString.parse(location.search);
