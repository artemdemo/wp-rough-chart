export enum EChartColumnType {
    number,
    text,
}

/**
 * Chart column type
 * @link https://bossanova.uk/jexcel/v3/examples/column-types
 */
export type TChartColumn = {
    type: string;
    title: string;
    render?: string;
    width?: number;
    // Synthetic property, used only inside of my app
    // Will define how to parse the value
    _valueType?: EChartColumnType;
};
