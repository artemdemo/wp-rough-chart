import React from 'react';
import _omit from 'lodash/omit';
import _get from 'lodash/get';
import { ChartTypes } from '../chartTypes';
import PieChartFields from '../containers/ChartFields/PieChartFields';
import Button, { BtnAppearance } from '../components/Button/Button';
import Title from '../components/Title/Title';
import Notifications, { sendNotification } from '../components/Notifications/Notifications';
import { t } from '../services/i18n';
import { saveChartData, getChartById } from '../services/ajax';
import { QueryParams } from '../services/routing';

interface IProps {
    query: QueryParams,
    type: ChartTypes;
}

interface IState {}

class EditChart extends React.PureComponent<IProps, IState> {
    private chartFieldsRef = React.createRef<PieChartFields>();

    componentDidMount(): void {
        const { query } = this.props;
        const chartId = query.chart_id ? parseInt(query.chart_id, 10) : null;
        if (chartId) {
            getChartById(chartId)
        }
    }

    saveChartData = () => {
        const { query } = this.props;
        const type = String(ChartTypes[_get(query, 'type', '-1')]).toLowerCase();
        const chartData = this.chartFieldsRef?.current?.getData();
        if (chartData && !chartData.error) {
            saveChartData({
                ..._omit(chartData, ['error']),
                type,
            })
                .then((result) => {
                    sendNotification(t('chartSaved'));
                    console.log(result);
                });
        }
    };

    renderTitle() {
        const { query } = this.props;
        switch ( parseInt(_get(query, 'type', '-1'), 10) ) {
            case ChartTypes.pie:
                return t('newPieChart');
            case ChartTypes.bars:
            case ChartTypes.columns:
            default:
                throw new Error(`No component fround for the given chart type: ${query.type}`);
        }
    }

    renderFields() {
        const { query } = this.props;
        let ChartFieldsComponent;
        switch (parseInt(_get(query, 'type', '-1'), 10)) {
            case ChartTypes.pie:
                ChartFieldsComponent = PieChartFields;
                break;
            case ChartTypes.bars:
            case ChartTypes.columns:
            default:
                throw new Error(`No component fround for the given chart type: ${query.type}`);
        }
        return (
            <ChartFieldsComponent ref={this.chartFieldsRef} />
        );
    }

    render() {
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
                    {t('createNewChart')}
                </Button>
                <Notifications />
            </React.Fragment>
        )
    }
}


export default EditChart
