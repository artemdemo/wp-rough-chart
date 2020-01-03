import React from 'react';
import _omit from 'lodash/omit';
import _get from 'lodash/get';
import { TChartDB, TChartTypes } from '../chartTypes';
import PieChartFields from '../containers/ChartFields/PieChartFields';
import Button, { BtnAppearance } from '../components/Button/Button';
import Title from '../components/Title/Title';
import Loading from '../components/Loading/Loading';
import { sendNotification } from '../components/Notifications/Notifications';
import { t } from '../services/i18n';
import { addNewChart, TAddNewChartResult, updateChart, getChartById } from '../services/ajax';
import { QueryParams, pushState } from '../routing/routing';
import { getUrlToChartsList } from '../services/appData';
import { getIntFromString } from '../services/utils';
import jqXHR = JQuery.jqXHR;

interface IProps {
    query: QueryParams,
    type: TChartTypes;
}

interface IState {
    chartData: any;
    loading: boolean;
}

class EditChart extends React.PureComponent<IProps, IState> {
    private chartFieldsRef = React.createRef<PieChartFields>();

    public state = {
        chartData: null,
        loading: true,
    };

    private requestRef: jqXHR;

    componentDidMount(): void {
        const { query } = this.props;
        const chartId = getIntFromString(query.chart_id);
        if (chartId !== undefined) {
            this.requestRef = getChartById(chartId)
                .done((chartServerData: TChartDB) => {
                    if (chartServerData.chart) {
                        this.setState({
                            chartData: {
                                title: chartServerData.title,
                                chart: JSON.parse(chartServerData.chart),
                            },
                            loading: false,
                        });
                    }
                })
                .fail(() => {
                    this.setState({ loading: false });
                });
        }
    }

    componentWillUnmount(): void {
        this.requestRef && this.requestRef.abort();
    }

    saveChartData = () => {
        const { query } = this.props;
        const type = String(TChartTypes[_get(query, 'type', '-1')]).toLowerCase();
        const chartData = this.chartFieldsRef?.current?.getData();
        this.setState({ loading: true });
        if (query.chart_id === 'new') {
            if (chartData && !chartData.error) {
                this.requestRef = addNewChart({
                    ..._omit(chartData, ['error']),
                    type,
                })
                    .done((result: TAddNewChartResult) => {
                        sendNotification(t('chartAdded'));
                        // Potentially here you can keep user on this page,
                        // just update the current URL.
                        // pushState(getUrlToChart(String(result.last_id), _get(query, 'type')));
                        pushState(getUrlToChartsList());
                    })
                    .fail(() => {
                        this.setState({ loading: false });
                    });
            }
        } else if (query.chart_id) {
            this.requestRef = updateChart(
                getIntFromString(query.chart_id),
                _omit(chartData, ['error']),
            )
                .done((result: TAddNewChartResult) => {
                    sendNotification(t('chartSaved'));
                    pushState(getUrlToChartsList());
                })
                .fail(() => {
                    this.setState({ loading: false });
                });
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
                chartId={getIntFromString(query.chart_id)}
                disabled={this.state.loading}
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
                    disabled={this.state.loading}
                >
                    {query.chart_id === 'new' ? t('createNewChart') : t('saveChart')}
                </Button>
                <Loading show={this.state.loading} inline />
            </React.Fragment>
        )
    }
}


export default EditChart
