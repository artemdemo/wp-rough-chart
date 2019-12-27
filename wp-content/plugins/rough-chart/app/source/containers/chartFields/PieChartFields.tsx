import { h } from 'preact';
import { Fragment, createRef } from 'preact/compat';
import PropInput from '../../components/formProps/PropInput';
import FillStyle, { defaultStyle } from '../../components/formProps/FillStyle';
import ChartFields from './ChartFields';
import ChartTypes from '../chartTypes';
import ChartData from '../ChartData/ChartData';
import { t } from '../../services/i18n';

class PieChartFields extends ChartFields {
    private chartDataRef = createRef<ChartData>();

    public state = {
        title: '',
        titleErr: false,
        fillStyle: defaultStyle.type,
        strokeWidth: 1,
        strokeWidthErr: false,
        fillWeight: 0.85,
        fillWeightErr: false,
        roughness: 1,
        roughnessErr: false,
        xLabel: '',
        yLabel: '',
    };

    public getData() {
        const { title, fillStyle, strokeWidth, fillWeight, roughness, xLabel, yLabel } = this.state;
        let error = false;
        const newState = {
            titleErr: false,
            strokeWidthErr: false,
            fillWeightErr: false,
            roughnessErr: false,
        };
        if (title === '') { newState.titleErr = true; error = true; }
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
            xLabel,
            yLabel,
            data: this.chartDataRef?.current?.getData(),
            error,
        };
    }

    updateProp(propKey: string, value: string|number) {
        this.setState({
            [propKey]: value,
            // Relatively simple solution for hiding error for the given field.
            // The alternative (and the better approach) will be to write logic for each field.
            [`${propKey}Err`]: false,
        })
    };

    renderChartFields() {
        return (
            <Fragment>
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
                <PropInput
                    title={t('xLabel')}
                    description={t('xLabelDescription')}
                    onChange={this.updateProp.bind(this, 'xLabel')}
                    value={this.state.xLabel}
                />
                <PropInput
                    title={t('yLabel')}
                    description={t('yLabelDescription')}
                    onChange={this.updateProp.bind(this, 'yLabel')}
                    value={this.state.yLabel}
                />
            </Fragment>
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
