import { Fragment, createRef, h } from 'preact';
import PropInput from '../PropInput';
import FillStyle from '../FillStyle';
import ChartFields, { IProps } from './ChartFields';
import ChartTypes from '../chartTypes';
import ChartData from '../ChartData/ChartData';
import { t } from '../../../services/i18n';

interface IPropsPie extends IProps {}

class PieChartFields extends ChartFields {
    private chartDataRef = createRef<ChartData>();

    public state = {
        title: '',
        titleErr: false,
        fillStyle: 'hachure',
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
        return {
            title,
            fillStyle,
            strokeWidth,
            fillWeight,
            roughness,
            xLabel,
            yLabel,
            data: this.chartDataRef?.current?.getData(),
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
