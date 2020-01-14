import React from 'react';
import ChartData from '../ChartData/ChartData';
import { defaultStyle } from '../formProps/FillStyle';
import Legend, { defaultLegend } from '../formProps/Legend';
import FormTable from '../../components/FormTable/FormTable';
import PropInput from '../formProps/PropInput';
import {t} from '../../services/i18n';
import _isNumber from 'lodash/isNumber';
import FormField from '../../components/FormTable/FormField';
import Shortcode from '../Shortcode/Shortcode';
import GridCell from '../../components/Grid/GridCell';
import Grid from '../../components/Grid/Grid';

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

    renderShortcode() {
        const { chartId } = this.props;
        if (_isNumber(chartId)) {
            return (
                <FormField
                    title={t('shortcode')}
                >
                    <Shortcode chartId={Number(chartId)} />
                </FormField>
            );
        }
        return null;
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
                <Legend
                    value={this.state.legend}
                    onChange={this.updateProp.bind(this, 'legend')}
                    disabled={disabled}
                />
            </React.Fragment>
        );
    }

    renderChartData() {
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

export default ColumnsFields;
