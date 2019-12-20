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
        };
    }

    public getData() {
        return this.chartDataRef?.current?.getData();
    }

    renderChartFields() {
        return (
            <Fragment>
                <FillStyle />
                <PropInput title={t('strokeWidth')} />
                <PropInput
                    title={t('fillWeight')}
                    description={t('fillWeightDescription')}
                />
                <PropInput
                    title={t('roughness')}
                    description={t('roughnessDescription')}
                />
                <PropInput
                    title={t('xLabel')}
                    description={t('xLabelDescription')}
                />
                <PropInput
                    title={t('yLabel')}
                    description={t('yLabelDescription')}
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
