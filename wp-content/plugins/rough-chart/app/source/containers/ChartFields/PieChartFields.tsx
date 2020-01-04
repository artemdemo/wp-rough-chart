import React from 'react';
import _isNumber from 'lodash/isNumber';
import PropInput from '../formProps/PropInput';
import PropCheckbox from '../formProps/PropCheckbox';
import FillStyle, { defaultStyle } from '../formProps/FillStyle';
import { TChartTypes, TChartPie, TChartPieTable } from '../../chartTypes';
import ChartData from '../ChartData/ChartData';
import { t } from '../../services/i18n';
import Grid from '../../components/Grid/Grid';
import GridCell from '../../components/Grid/GridCell';
import FormTable from '../../components/FormTable/FormTable';
import FormField from '../../components/FormTable/FormField';
import Shortcode from '../Shortcode/Shortcode';
import { fromJExcelToPie, fromPieToJExcel } from '../../services/chartDTO';

interface IPieChartFields {
    title: string;
    chart: TChartPie;
}

interface IPieChartFieldsOutput extends IPieChartFields {
    chart_type: string;
    error: boolean;
}

interface IProps {
    chartProps: IPieChartFields;
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
    legend: boolean;
    dataUpdated: boolean;
}

class PieChartFields extends React.PureComponent<IProps, IState> {
    private chartDataRef = React.createRef<ChartData>();

    static defaultPros = {
        data: null,
        chartId: undefined,
        disabled: false,
    };

    public state = {
        title: '',  // title can be empty
        fillStyle: defaultStyle.type,
        strokeWidth: '1',
        strokeWidthErr: false,
        fillWeight: '0.5',
        fillWeightErr: false,
        roughness: '1',
        roughnessErr: false,
        legend: true,
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
        let error = false;
        const newState = {
            strokeWidthErr: false,
            fillWeightErr: false,
            roughnessErr: false,
        };
        if (strokeWidth <= 0) { newState.strokeWidthErr = true; error = true; }
        if (fillWeight <= 0) { newState.fillWeightErr = true; error = true; }
        if (roughness <= 0) { newState.roughnessErr = true; error = true; }
        this.setState(newState);

        return {
            title,
            chart_type: TChartTypes[TChartTypes.pie],
            chart: {
                fillStyle,
                strokeWidth,
                fillWeight,
                roughness,
                legend,
                data: this.getTableData(),
            },
            error,
        };
    }

    getTableData(): TChartPieTable {
        return fromJExcelToPie(
            this.chartDataRef?.current?.getData(),
        );
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
                <PropInput
                    title={t('strokeWidth')}
                    onChange={this.updateProp.bind(this, 'strokeWidth')}
                    value={this.state.strokeWidth}
                    error={this.state.strokeWidthErr}
                    disabled={disabled}
                    numeric
                />
                <PropInput
                    title={t('fillWeight')}
                    description={t('fillWeightDescription')}
                    onChange={this.updateProp.bind(this, 'fillWeight')}
                    value={this.state.fillWeight}
                    error={this.state.fillWeightErr}
                    disabled={disabled}
                    numeric
                />
                <PropInput
                    title={t('roughness')}
                    description={t('roughnessDescription')}
                    onChange={this.updateProp.bind(this, 'roughness')}
                    value={this.state.roughness}
                    error={this.state.roughnessErr}
                    disabled={disabled}
                    numeric
                />
                <PropCheckbox
                    title={t('showLegend')}
                    onChange={this.updateProp.bind(this, 'legend')}
                    value={this.state.legend}
                    disabled={disabled}
                />
            </React.Fragment>
        );
    }

    renderShortcode() {
        const { chartId, chartProps } = this.props;
        if ( _isNumber(chartId) ) {
            return (
                <FormField
                    title={t('shortcode')}
                >
                    <Shortcode chartId={Number(chartId)} title={chartProps?.title} />
                </FormField>
            );
        }
        return null;
    }

    renderChartData() {
        const { disabled, chartProps, chartId } = this.props;
        const hasData = !!chartProps?.chart?.data;
        if (hasData || chartId === 'new') {
            return (
                <ChartData
                    type={TChartTypes.pie}
                    disabled={disabled}
                    data={hasData ? fromPieToJExcel(chartProps.chart.data) : undefined}
                    ref={this.chartDataRef}
                />
            );
        }
        return null;
    }

    render() {
        const { disabled } = this.props;

        return (
            <React.Fragment>
                <FormTable>
                    <PropInput
                        title={t('title')}
                        onChange={this.updateProp.bind(this, 'title')}
                        value={this.state.title}
                        disabled={disabled}
                    />
                    {this.renderShortcode()}
                </FormTable>
                <p>{t('defineChart')}</p>
                <Grid>
                    <GridCell columns='lg-4 md-12'>
                        <FormTable>
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

export default PieChartFields;
