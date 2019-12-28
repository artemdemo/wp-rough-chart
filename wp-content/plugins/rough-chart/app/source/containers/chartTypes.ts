export type Chart = {
    id: number;
    title: string;
    chart_type: string;
    created: string;
    last_updated: string;
    chart?: string;
};

enum ChartTypes {
    Pie,
    Bars,
    Columns,
}

export default ChartTypes;
