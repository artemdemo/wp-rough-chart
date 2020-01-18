import React from 'react';
import _isNumber from 'lodash/isNumber';
import FormField from '../../components/FormTable/FormField';
import { t } from '../../services/i18n';
import Shortcode from '../Shortcode/Shortcode';
import PropInput from '../formProps/PropInput';
import FormTable from '../../components/FormTable/FormTable';
import Legend from '../formProps/Legend';
import ChartData from '../ChartData/ChartData';
import { TChartSettings, TChartTable, TChartTypes } from '../../chartTypes';
import { TJExcel } from '../../services/chartDTO';

export interface IChartProps {
    title: string;
    chart: TChartSettings;
    error: boolean;
}

export interface IBasicFieldsProps {
    chartId?: number|string;
    disabled?: boolean;
    chartProps: IChartProps
}

export interface IBasicFieldsState {
    title: string;
    strokeWidth: string;
    strokeWidthErr: boolean;
    fillWeight: string;
    fillWeightErr: boolean;
    roughness: string;
    roughnessErr: boolean;
    legend: string;
}

class BasicFields<P extends IBasicFieldsProps, S extends IBasicFieldsState> extends React.Component<P, S> {
    chartDataRef = React.createRef<ChartData>();

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

    updateTitle = (title) => {
        this.setState({ title })
    };

    updateStrokeWidth = (strokeWidth) => {
        this.setState({ strokeWidth, strokeWidthErr: false });
    };

    updateFillWeight = (fillWeight) => {
        this.setState({ fillWeight, fillWeightErr: false });
    };

    updateRoughness = (roughness) => {
        this.setState({ roughness, roughnessErr: false });
    };

    updateLegend = (legend) => {
        this.setState({ legend });
    };

    public getData(): IChartProps {
        const { title, legend } = this.state;
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
            chart: {
                strokeWidth,
                fillWeight,
                roughness,
                legend,
                data: tableDate,
            },
            error,
        };
    }

    getTableData(): TChartTable|null {
        return null;
    }

    provideChartData(): TJExcel|undefined {
        return undefined;
    }

    renderShortcode() {
        const { chartId } = this.props;
        if (_isNumber(chartId)) {
            return (
                <FormField title={t('shortcode')}>
                    <Shortcode chartId={Number(chartId)} />
                </FormField>
            );
        }
        return null;
    }

    renderTitle() {
        const { disabled } = this.props;
        return (
            <FormTable>
                <PropInput
                    title={t('title')}
                    onChange={this.updateTitle}
                    value={this.state.title}
                    disabled={disabled}
                />
                {this.renderShortcode()}
            </FormTable>
        );
    }

    renderBasicFields() {
        const { disabled } = this.props;
        return (
            <React.Fragment>
                <PropInput
                    title={t('strokeWidth')}
                    onChange={this.updateStrokeWidth}
                    value={this.state.strokeWidth}
                    error={this.state.strokeWidthErr}
                    disabled={disabled}
                    numeric
                />
                <PropInput
                    title={t('fillWeight')}
                    description={t('fillWeightDescription')}
                    onChange={this.updateFillWeight}
                    value={this.state.fillWeight}
                    error={this.state.fillWeightErr}
                    disabled={disabled}
                    numeric
                />
                <PropInput
                    title={t('roughness')}
                    description={t('roughnessDescription')}
                    onChange={this.updateRoughness}
                    value={this.state.roughness}
                    error={this.state.roughnessErr}
                    disabled={disabled}
                    numeric
                />
                <Legend
                    value={this.state.legend}
                    onChange={this.updateLegend}
                    disabled={disabled}
                />
            </React.Fragment>
        );
    }

    renderChartData(chartType: TChartTypes) {
        const { disabled, chartProps, chartId } = this.props;
        const hasData = !!chartProps?.chart?.data;
        if (hasData || chartId === 'new') {
            return (
                <ChartData
                    type={chartType}
                    disabled={disabled}
                    data={this.provideChartData()}
                    ref={this.chartDataRef}
                />
            );
        }
        return null;
    }
}

export default BasicFields;