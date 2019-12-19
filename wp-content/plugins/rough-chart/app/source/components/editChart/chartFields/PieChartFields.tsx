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
                <PropInput title='Fill Weight' />
                <PropInput title='Roughness' />
                <PropInput title='X Label' />
                <PropInput title='Y Label' />
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
