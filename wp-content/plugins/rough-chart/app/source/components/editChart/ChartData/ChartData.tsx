import { Component, createRef, Fragment, h } from 'preact';
import jexcel from 'jexcel';
import * as pieData from './data/pieData';
import ChartTypes from '../chartTypes';
import { t } from '../../../services/i18n';
import contextMenu from './contextMenu';

import './ChartData.less';

interface IProps {
    type?: ChartTypes;
}

interface IState {}

class ChartData extends Component<IProps, IState> {
    tableRef = createRef();

    componentDidMount():void {
        const { type } = this.props;
        let chartData;
        switch (type) {
            case ChartTypes.Pie:
                chartData = pieData;
                break;
            case ChartTypes.Bars:
            case ChartTypes.Columns:
            default:
                throw new Error(`There is no data for given "type",received: ${type}`);
        }
        jexcel(this.tableRef.current, {
            data: chartData.defaultData,
            columns: chartData.columns,
            contextMenu,
        });
    }

    render(props: IProps, state: IState, context) {
        return (
            <Fragment>
                <h2>{t('chartData')}:</h2>
                <div ref={this.tableRef} />
            </Fragment>
        );
    }
}

export default ChartData;
