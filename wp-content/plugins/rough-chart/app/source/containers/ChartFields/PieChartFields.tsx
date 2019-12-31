import React from 'react';
import PropInput from '../formProps/PropInput';
import PropCheckbox from '../formProps/PropCheckbox';
import FillStyle, { defaultStyle } from '../formProps/FillStyle';
import ChartFields from './ChartFields';
import ChartTypes from '../chartTypes';
import ChartData from '../ChartData/ChartData';
import { t } from '../../services/i18n';

class PieChartFields extends ChartFields {
    private chartDataRef = React.createRef<ChartData>();

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
    };

    public getData() {
        const { title, fillStyle, legend } = this.state;
        const strokeWidth = parseFloat(this.state.strokeWidth);
        const fillWeight = parseFloat(this.state.fillWeight);
        const roughness = parseFloat(this.state.roughness);
        let error = false;
        const newState = {
            titleErr: false,
            strokeWidthErr: false,
            fillWeightErr: false,
            roughnessErr: false,
        };
        if (strokeWidth <= 0) { newState.strokeWidthErr = true; error = true; }
        if (fillWeight <= 0) { newState.fillWeightErr = true; error = true; }
        if (roughness <= 0) { newState.roughnessErr = true; error = true; }
        // @ts-ignore
        this.setState(newState);
        return {
            title,
            fillStyle,
            strokeWidth,
            fillWeight,
            roughness,
            legend,
            data: this.chartDataRef?.current?.getData(),
            error,
        };
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
        return (
            <React.Fragment>
                <FillStyle
                    value={this.state.fillStyle}
                    onChange={this.updateProp.bind(this, 'fillStyle')}
                />
                <PropInput
                    title={t('strokeWidth')}
                    onChange={this.updateProp.bind(this, 'strokeWidth')}
                    value={this.state.strokeWidth}
                    error={this.state.strokeWidthErr}
                    numeric
                />
                <PropInput
                    title={t('fillWeight')}
                    description={t('fillWeightDescription')}
                    onChange={this.updateProp.bind(this, 'fillWeight')}
                    value={this.state.fillWeight}
                    error={this.state.fillWeightErr}
                    numeric
                />
                <PropInput
                    title={t('roughness')}
                    description={t('roughnessDescription')}
                    onChange={this.updateProp.bind(this, 'roughness')}
                    value={this.state.roughness}
                    error={this.state.roughnessErr}
                    numeric
                />
                <PropCheckbox
                    title={t('showLegend')}
                    onChange={this.updateProp.bind(this, 'legend')}
                    value={this.state.legend}
                />
            </React.Fragment>
        );
    }

    renderChartData() {
        return (
            <ChartData
                type={ChartTypes.Pie}
                ref={this.chartDataRef}
            />
        );
    }
}

export default PieChartFields;
