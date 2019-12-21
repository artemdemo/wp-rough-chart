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

    constructor(props: IPropsPie) {
        super(props);

        this.state = {
            // @ts-ignore
            ...super.state,
            // @ts-ignore
            fillStyle: '',
            strokeWidth: 1,
            fillWeight: 0.85,
            roughness: 1,
            xLabel: '',
            yLabel: '',
        };
    }

    public getData() {

        const {
            title,
            // @ts-ignore
            fillStyle, strokeWidth, fillWeight, roughness, xLabel, yLabel } = this.state;
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

    updateProp(propKey: string, e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            [propKey]: e.target.value,
        })
    };

    renderChartFields() {
        return (
            <Fragment>
                <FillStyle />
                <PropInput
                    title={t('strokeWidth')}
                    onChange={this.updateProp.bind(this, 'strokeWidth')}
                />
                <PropInput
                    title={t('fillWeight')}
                    description={t('fillWeightDescription')}
                    onChange={this.updateProp.bind(this, 'fillWeight')}
                />
                <PropInput
                    title={t('roughness')}
                    description={t('roughnessDescription')}
                    onChange={this.updateProp.bind(this, 'roughness')}
                />
                <PropInput
                    title={t('xLabel')}
                    description={t('xLabelDescription')}
                    onChange={this.updateProp.bind(this, 'xLabel')}
                />
                <PropInput
                    title={t('yLabel')}
                    description={t('yLabelDescription')}
                    onChange={this.updateProp.bind(this, 'yLabel')}
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
