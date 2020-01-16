import React from 'react';
import { defaultStyle } from '../formProps/FillStyle';
import PropColor from '../formProps/PropColor';
import { defaultLegend } from '../formProps/Legend';
import FormTable from '../../components/FormTable/FormTable';
import { t } from '../../services/i18n';
import GridCell from '../../components/Grid/GridCell';
import Grid from '../../components/Grid/Grid';
import BasicFields, {IBasicFieldsProps, IBasicFieldsState, IChartProps} from './BasicFields';
import {TChartTable, TChartTypes} from '../../chartTypes';
import { fromGeneralLineToJExcel, fromJExcelToGeneralLine, TJExcel } from '../../services/chartDTO';

interface IGeneralLineFieldsOutput extends IChartProps {
    chart_type: string;
}

interface IProps extends IBasicFieldsProps {
    chartProps: any;
    chartType: TChartTypes;
}

interface IState extends IBasicFieldsState {
    fillStyle: string;
    fillColor: string;
    dataUpdated: boolean;
}

class GeneralLineFields extends BasicFields<IProps, IState> {
    static defaultPros = {
        chartProps: null,
        chartId: undefined,
        disabled: false,
    };

    public state = {
        title: '',  // title can be empty
        fillStyle: defaultStyle.type,
        fillColor: '#ff5722',
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
                strokeWidth: String(props.chartProps.chart.strokeWidth),
                fillWeight: String(props.chartProps.chart.fillWeight),
                roughness: String(props.chartProps.chart.roughness),
                legend: props.chartProps.chart.legend,
                dataUpdated: true,
            };
        }
        return null;
    }

    public getData(): IGeneralLineFieldsOutput {
        const { fillStyle } = this.state;
        const { chartType } = this.props;
        const superData = super.getData();
        return {
            ...superData,
            chart_type: TChartTypes[chartType],
            chart: {
                ...superData.chart,
                fillStyle,
            },
        };
    }

    getTableData(): TChartTable|null {
        if (this.chartDataRef?.current?.getData) {
            const tableData = this.chartDataRef.current.getData();
            if (!tableData.error) {
                return fromJExcelToGeneralLine(
                    tableData.data,
                );
            }
        }
        return null;
    }

    provideChartData(): TJExcel|undefined {
        const { chartProps } = this.props;
        const hasData = !!chartProps?.chart?.data;
        return hasData ? fromGeneralLineToJExcel(chartProps.chart.data || undefined) : undefined;
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
                <PropColor
                    title={t('fillColor')}
                    defaultColor={this.state.fillColor}
                    onChange={this.updateProp.bind(this, 'fillColor')}
                    disabled={disabled}
                />
            </React.Fragment>
        );
    }

    renderChartData() {
        return super.renderChartData(TChartTypes.columns);
    }

    render() {
        return (
            <React.Fragment>
                {this.renderTitle()}
                <p>{t('defineChart')}</p>
                <Grid>
                    <GridCell columns='lg-4 md-12'>
                        <FormTable>
                            {this.renderBasicFields()}
                            {this.renderChartFields()}
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

export default GeneralLineFields;
