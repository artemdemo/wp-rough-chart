import React from 'react';
import _isNumber from 'lodash/isNumber';
import FormField from '../../components/FormTable/FormField';
import { t } from '../../services/i18n';
import Shortcode from '../Shortcode/Shortcode';
import PropInput from '../formProps/PropInput';
import FormTable from '../../components/FormTable/FormTable';
import Legend from '../formProps/Legend';

export interface IBasicFieldsProps {
    chartId?: number|string;
    disabled?: boolean;
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
}

export default BasicFields;
