import React from 'react';
import ChartData from '../ChartData/ChartData';
import { defaultStyle } from '../formProps/FillStyle';
import { defaultLegend } from '../formProps/Legend';

interface IProps {
    chartProps: any
    chartId?: number|string;
    disabled?: boolean;
}
interface IState {
    title: string;
    fillStyle: string;
    strokeWidth: string;
    strokeWidthErr: boolean;
    fillWeight: string;
    fillWeightErr: boolean;
    roughness: string;
    roughnessErr: boolean;
    legend: string;
    dataUpdated: boolean;
}

class ColumnsFields extends React.PureComponent<IProps, IState> {
    private chartDataRef = React.createRef<ChartData>();

    static defaultPros = {
        chartProps: null,
        chartId: undefined,
        disabled: false,
    };

    public state = {
        title: '',  // title can be empty
        fillStyle: defaultStyle.type,
        legend: defaultLegend.type,
        strokeWidth: '',
        strokeWidthErr: false,
        fillWeight: '',
        fillWeightErr: false,
        roughness: '',
        roughnessErr: false,
        dataUpdated: false,
    };

    render() {
        return (
            <React.Fragment>
                ColumnsFields
            </React.Fragment>
        );
    }
}

export default ColumnsFields;
