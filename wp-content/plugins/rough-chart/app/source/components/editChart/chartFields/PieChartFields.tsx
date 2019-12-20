import { Fragment, h } from 'preact';
import PropInput from '../PropInput';
import FillStyle from '../FillStyle';
import ChartFields, { IProps } from './ChartFields';
import ChartTypes from '../chartTypes';
import ChartData from '../ChartData/ChartData';

interface IPropsPie extends IProps {}

class PieChartFields extends ChartFields {
    constructor(props: IPropsPie) {
        super(props);

        this.state = {
            // @ts-ignore
            ...super.state,
        };
    }

    renderChartFields() {
        return (
            <Fragment>
                <FillStyle />
                <PropInput title='Stroke Width' />
                <PropInput
                    title='Fill Weight'
                    description="Weight of inner paths' color. Default: 0.5."
                />
                <PropInput
                    title='Roughness'
                    description='Roughness level of chart. Default: 1.'
                />
                <PropInput
                    title='X Label'
                    description='Label for x-axis.'
                />
                <PropInput
                    title='Y Label'
                    description='Label for y-axis.'
                />
            </Fragment>
        );
    }

    renderChartData() {
        return (
            <ChartData
                type={ChartTypes.Pie}
            />
        );
    }
}

export default PieChartFields;
