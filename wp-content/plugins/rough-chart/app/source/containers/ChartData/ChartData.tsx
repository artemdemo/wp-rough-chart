import React from 'react';
import jexcel from 'jexcel';
import classnames from 'classnames';
import Description from '../../components/Description/Description';
import ErrorBubble from '../../components/Error/ErrorBubble';
import { TChartTypes, TGeneralError } from '../../chartTypes';
import { t } from '../../services/i18n';
import { TJExcel } from '../../services/chartDTO';
import { couldBeNumber } from '../../services/utils';
import contextMenu from './contextMenu';
import * as pieData from './data/pieData';

import './ChartData.less';

interface IProps {
    type: TChartTypes;
    data?: TJExcel;
    disabled?: boolean;
}

interface IState {
    error: TGeneralError;
}

class ChartData extends React.PureComponent<IProps, IState> {
    static defaultProps = {
        disabled: false,
    };

    public state = {
        error: null,
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
            allowInsertRow: true,
            allowManualInsertRow: true,
            allowInsertColumn: false,
            allowManualInsertColumn: false,
            allowDeleteRow: true,
            allowDeleteColumn: false,
            contextMenu,
            onafterchanges: this.handleOnAfterChange,
        });
    }

    public getData(): { data: TJExcel; error: TGeneralError; } {
        let error: TGeneralError = null;
        const jExcelData = this.table.getData();
        for (const row of jExcelData) {
            for (const item of row) {
                if (item === '') {
                    error = {
                        msg: t('noEmptyCellsInTable'),
                    };
                    break;
                }
            }
            if (error) { break; }
            if (!couldBeNumber(row[1])) {
                error = {
                    msg: t('valuesShouldBeNumbers'),
                };
                break;
            }
        }
        this.setState({ error });
        return {
            data: jExcelData,
            error,
        };
    }

    handleOnAfterChange = () => {
        this.setState({
            error: null,
        })
    };

    renderError() {
        if (this.state.error) {
            // @ts-ignore
            const errText = this.state.error.msg;
            return (
                <ErrorBubble>
                    {errText}
                </ErrorBubble>
            );
        }
        return null;
    }

    render() {
        return (
            <React.Fragment>
                <h2>{t('chartData')}:</h2>
                <div
                    className={classnames({
                        'table-has-error': !!this.state.error,
                    })}
                >
                    <div ref={this.tableBaseRef} />
                </div>
                <Description>
                    {t('chartDataAddRowsHint')}
                </Description>
                {this.renderError()}
            </React.Fragment>
        );
    }
}

export default ChartData;
