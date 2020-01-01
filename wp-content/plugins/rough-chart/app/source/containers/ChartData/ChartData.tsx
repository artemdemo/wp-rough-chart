import React from 'react';
import jexcel from 'jexcel';
import * as pieData from './data/pieData';
import { TChartTypes } from '../../chartTypes';
import { t } from '../../services/i18n';
import contextMenu from './contextMenu';
import Description from '../../components/Description/Description';

import './ChartData.less';

interface IProps {
    type?: TChartTypes;
}

interface IState {}

class ChartData extends React.PureComponent<IProps, IState> {
    private tableBaseRef = React.createRef<HTMLDivElement>();
    private table: any = null;

    componentDidMount():void {
        const { type } = this.props;
        let chartData;
        switch (type) {
            case TChartTypes.pie:
                chartData = pieData;
                break;
            case TChartTypes.bars:
            case TChartTypes.columns:
            default:
                throw new Error(`There is no data for given "type",received: ${type}`);
        }
        this.table = jexcel(this.tableBaseRef.current, {
            data: chartData.defaultData,
            columns: chartData.columns,
            contextMenu,
        });
    }

    public getData() {
        return this.table.getData();
    }

    render() {
        return (
            <React.Fragment>
                <h2>{t('chartData')}:</h2>
                <div ref={this.tableBaseRef} />
                <Description>
                    {t('chartDataAddRowsHint')}
                </Description>
            </React.Fragment>
        );
    }
}

export default ChartData;
