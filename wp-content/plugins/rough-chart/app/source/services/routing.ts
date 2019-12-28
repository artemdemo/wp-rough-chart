import queryString from 'query-string';

export const getQuery = () => queryString.parse(location.search);
