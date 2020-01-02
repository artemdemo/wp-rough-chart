import React from 'react';
import _omit from 'lodash/omit';
import _get from 'lodash/get';
import { TChartDB, TChartTypes } from '../chartTypes';
import PieChartFields from '../containers/ChartFields/PieChartFields';
import Button, { BtnAppearance } from '../components/Button/Button';
import Title from '../components/Title/Title';
import { sendNotification } from '../components/Notifications/Notifications';
import { t } from '../services/i18n';
import { addNewChart, TAddNewChartResult, getChartById } from '../services/ajax';
import { QueryParams, pushState } from '../routing/routing';
import { getUrlToChart } from '../services/appData';

interface IProps {
    query: QueryParams,
    type: TChartTypes;
}

interface IState {
    chartData: any;
}

class EditChart extends React.PureComponent<IProps, IState> {
    private chartFieldsRef = React.createRef<PieChartFields>();

    public state = {
        chartData: null,
    };

    componentDidMount(): void {
        const { query } = this.props;
        const chartId = query.chart_id ? parseInt(query.chart_id, 10) : null;
        if (chartId) {
            getChartById(chartId)
                .then((chartServerData: TChartDB) => {
                    if (chartServerData.chart) {
                        this.setState({
                            chartData: {
                                title: chartServerData.title,
                                chart: JSON.parse(chartServerData.chart)
                            },
                        });
                    }
                });
        }
    }

    saveChartData = () => {
        const { query } = this.props;
        const type = String(TChartTypes[_get(query, 'type', '-1')]).toLowerCase();
        const chartData = this.chartFieldsRef?.current?.getData();
        if (query.chart_id === 'new') {
            if (chartData && !chartData.error) {
                addNewChart({
                    ..._omit(chartData, ['error']),
                    type,
                })
                    .then((result: TAddNewChartResult) => {
                        sendNotification(t('chartSaved'));
                        pushState(
                            getUrlToChart(String(result.last_id), _get(query, 'type')),
                        );
                    });
            }
        }
    };

    renderTitle() {
        const { query } = this.props;
        switch ( parseInt(_get(query, 'type', '-1'), 10) ) {
            case TChartTypes.pie:
                return query.chart_id === 'new' ? t('newPieChart') : t('editPieChart');
            case TChartTypes.bars:
                return query.chart_id === 'new' ? t('newBarChart') : t('editBarChart');
            case TChartTypes.columns:
            default:
                throw new Error(`No component fround for the given chart type: ${query.type}`);
        }
    }

    renderFields() {
        const { query } = this.props;
        let ChartFieldsComponent;
        switch (parseInt(_get(query, 'type', '-1'), 10)) {
            case TChartTypes.pie:
                ChartFieldsComponent = PieChartFields;
                break;
            case TChartTypes.bars:
            case TChartTypes.columns:
            default:
                throw new Error(`No component fround for the given chart type: ${query.type}`);
        }
        return (
            <ChartFieldsComponent
                ref={this.chartFieldsRef}
                data={this.state.chartData}
            />
        );
    }

    render() {
        const { query } = this.props;
        return (
            <React.Fragment>
                <Title>
                    {this.renderTitle()}
                </Title>
                <hr className='wp-header-end' />
                <h2 className='screen-reader-text'>
                    {t('newChartOptions')}
                </h2>
                {this.renderFields()}
                <Button
                    onClick={this.saveChartData}
                    appearance={BtnAppearance.Primary}
                >
                    {query.chart_id === 'new' ? t('createNewChart') : t('saveChart')}
                </Button>
            </React.Fragment>
        )
    }
}


export default EditChart
