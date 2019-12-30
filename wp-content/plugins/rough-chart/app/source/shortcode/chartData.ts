type ChartPie = {
    fillStyle: string;
    strokeWidth: number;
    fillWeight: number;
    roughness: number;
    data: {
        labels: string[];
        values: number[];
    };
};

export const parseChart = (data: string): ChartPie|null => {
    try {
        return JSON.parse(data);
    } catch (e) {
        console.error(e);
    }
    return null;
};
