import React from 'react';
import jexcel from 'jexcel';
import classnames from 'classnames';
import styled from 'styled-components';
import Description from '../../components/Description/Description';
import { TChartTypes, TGeneralError } from '../../chartTypes';
import { t } from '../../services/i18n';
import { TJExcel } from '../../services/chartDTO';
import { couldBeNumber } from '../../services/utils';
import contextMenu from './contextMenu';
import * as pieData from './data/pieData';

import './ChartData.less';

const ErrorChartData = styled.div`
    display: inline-block;
    border-radius: 3px;
    padding: 5px 8px;
    background-color: rgba(244, 67, 54, 0.15);
    border-left: 1px solid red;
    color: red;
`;

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

    renderError() {
        if (this.state.error) {
            // @ts-ignore
            const errText = this.state.error.msg;
            return (
                <ErrorChartData>
                    {errText}
                </ErrorChartData>
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
