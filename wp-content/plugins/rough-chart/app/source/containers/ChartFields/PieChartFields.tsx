import React from 'react';
import FillStyle, { defaultStyle } from '../formProps/FillStyle';
import { TChartTypes, TChartTable } from '../../chartTypes';
import { t } from '../../services/i18n';
import Grid from '../../components/Grid/Grid';
import GridCell from '../../components/Grid/GridCell';
import FormTable from '../../components/FormTable/FormTable';
import { fromJExcelToPie } from '../../services/chartDTO';
import { defaultLegend } from '../formProps/Legend';
import BasicFields, { IBasicFieldsProps, IBasicFieldsState, IChartProps } from './BasicFields';

interface IPieChartFieldsOutput extends IChartProps {
    chart_type: string;
    error: boolean;
}

interface IProps extends IBasicFieldsProps {}

interface IState extends IBasicFieldsState {
    fillStyle: string;
    dataUpdated: boolean;
}

class PieChartFields extends BasicFields<IProps, IState> {
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

    static getDerivedStateFromProps(props: IProps, state) {
        // I'm updating state only once, when data is received (if it is what will happen).
        // The assumption here is that I'll receive data only once in the lifecycle.
        // It doesn't look legit that I'll request server more than once.
        if (props.chartProps && !state.dataUpdated) {
            return {
                title: props.chartProps.title,
                fillStyle: props.chartProps.chart.fillStyle,
                strokeWidth: String(props.chartProps.chart.strokeWidth),
                fillWeight: String(props.chartProps.chart.fillWeight),
                roughness: String(props.chartProps.chart.roughness),
                legend: props.chartProps.chart.legend,
                dataUpdated: true,
            };
        }
        return null;
    }

    public getData(): IPieChartFieldsOutput {
        const { title, fillStyle, legend } = this.state;
        const strokeWidth = parseFloat(this.state.strokeWidth);
        const fillWeight = parseFloat(this.state.fillWeight);
        const roughness = parseFloat(this.state.roughness);
        const tableDate = this.getTableData();
        let error = false;
        const newState = {
            strokeWidthErr: false,
            fillWeightErr: false,
            roughnessErr: false,
        };
        if (isNaN(strokeWidth) || strokeWidth <= 0) { newState.strokeWidthErr = true; error = true; }
        if (isNaN(fillWeight) || fillWeight <= 0) { newState.fillWeightErr = true; error = true; }
        if (isNaN(roughness) || roughness <= 0) { newState.roughnessErr = true; error = true; }
        if (!tableDate) { error = true; }

        this.setState(newState);

        return {
            title: title.trim(),
            chart_type: TChartTypes[TChartTypes.pie],
            chart: {
                fillStyle,
                strokeWidth,
                fillWeight,
                roughness,
                legend,
                data: tableDate,
            },
            error,
        };
    }

    componentDidMount(): void {
        const { chartId } = this.props;
        if (chartId === 'new') {
            // Set default values for the new chart
            this.setState({
                strokeWidth: '1',
                fillWeight: '0.5',
                roughness: '1',
            })
        }
    }

    updateProp(propKey: string, value: any) {
        // @ts-ignore
        this.setState({
            [propKey]: value,
            // Relatively simple solution for hiding error for the given field.
            // The alternative (and the better approach) will be to write logic for each field.
            [`${propKey}Err`]: false,
        })
    };

    renderChartFields() {
        const { disabled } = this.props;
        return (
            <React.Fragment>
                <FillStyle
                    value={this.state.fillStyle}
                    onChange={this.updateProp.bind(this, 'fillStyle')}
                    disabled={disabled}
                />
            </React.Fragment>
        );
    }

    render() {
        return (
            <React.Fragment>
                {this.renderTitle()}
                <p>{t('defineChart')}</p>
                <Grid>
                    <GridCell columns='lg-4 md-12'>
                        <FormTable>
                            {this.renderChartFields()}
                            {this.renderBasicFields()}
                        </FormTable>
                    </GridCell>
                    <GridCell columns='lg-8 md-12'>
                        {this.renderChartData()}
                    </GridCell>
                </Grid>
            </React.Fragment>
        );
    }
}

export default PieChartFields;
