// Chart object as it returned from the server DB
export type TChartDB = {
    id: number;
    title: string;
    chart_type: string;
    created: string;
    last_updated: string;
    chart?: string;
};

// Type that will be used to provide data in output of the shortcode
export type TChartShortcode = {
    id: number;
    className: string;
    title: string;
    chart_type: string;
    chart: string;
};

// Chart pie data as it returned from the table of values
export type TChartPieTable = {
    labels: string[];
    values: number[];
    colors: string[];
};

export type TChartPie = {
    fillStyle: string;
    strokeWidth: number;
    fillWeight: number;
    roughness: number;
    legend: boolean;
    data: TChartPieTable|null;
};

export enum TChartTypes {
    pie,
    bars,
    columns,
}

// General type for errors in the app
export type TGeneralError = {
    msg: string;
}|null;
