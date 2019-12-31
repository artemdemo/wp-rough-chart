/**
 * Chart object as it returned from the server DB
 */
export type ChartDB = {
    id: number;
    title: string;
    chart_type: string;
    created: string;
    last_updated: string;
    chart?: string;
};

/**
 * Type that will be used to provide data in output of the shortcode
 */
export type ChartShortcode = {
    id: number;
    className: string;
    title: string;
    chart_type: string;
    chart: string;
};

export type ChartPie = {
    fillStyle: string;
    strokeWidth: number;
    fillWeight: number;
    roughness: number;
    legend: boolean;
    data: {
        labels: string[];
        values: number[];
        colors: string[];
    };
};

export enum ChartTypes {
    pie,
    bars,
    columns,
}
