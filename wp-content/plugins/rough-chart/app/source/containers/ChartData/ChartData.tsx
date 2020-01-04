import React from 'react';
import jexcel from 'jexcel';
import Description from '../../components/Description/Description';
import { TChartTypes } from '../../chartTypes';
import { t } from '../../services/i18n';
import contextMenu from './contextMenu';
import { TJExcel } from '../../services/chartDTO';
import * as pieData from './data/pieData';

import './ChartData.less';

interface IProps {
    type: TChartTypes;
    data?: TJExcel;
    disabled?: boolean;
}

interface IState {}

class ChartData extends React.PureComponent<IProps, IState> {
    static defaultProps = {
        disabled: false,
    };

    private tableBaseRef = React.createRef<HTMLDivElement>();
    private table: any = null;

    componentDidMount():void {
        const { type, data } = this.props;
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
            data: data || chartData.defaultData,
            columns: chartData.columns,
            contextMenu,
        });
    }

    public getData(): TJExcel {
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
