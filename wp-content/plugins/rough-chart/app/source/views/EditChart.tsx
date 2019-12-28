import React from 'react';
import _omit from 'lodash/omit';
import _get from 'lodash/get';
import ChartTypes from '../containers/chartTypes';
import PieChartFields from '../containers/ChartFields/PieChartFields';
import Button, { BtnAppearance } from '../components/Button/Button';
import Title from '../components/Title/Title';
import { t } from '../services/i18n';
import { saveChartData } from '../services/ajax';
import { QueryParams } from '../services/routing';

interface IProps {
    query: QueryParams,
    type: ChartTypes;
}

interface IState {}

class EditChart extends React.PureComponent<IProps, IState> {
    private chartFieldsRef = React.createRef<PieChartFields>();

    saveChartData = () => {
        const { query } = this.props;
        const type = String(ChartTypes[_get(query, 'type', '-1')]).toLowerCase();
        const chartData = this.chartFieldsRef?.current?.getData();
        if (chartData && !chartData.error) {
            saveChartData({
                ..._omit(chartData, ['error']),
                type,
            })
                .done((result) => {
                    console.log(result);
                });
        }
    };

    renderTitle() {
        const { query } = this.props;
        switch ( parseInt(_get(query, 'type', '-1'), 10) ) {
            case ChartTypes.Pie:
                return t('newPieChart');
            case ChartTypes.Bars:
            case ChartTypes.Columns:
            default:
                throw new Error(`No component fround for the given chart type: ${query.type}`);
        }
    }

    renderFields() {
        const { query } = this.props;
        let ChartFieldsComponent;
        switch (parseInt(_get(query, 'type', '-1'), 10)) {
            case ChartTypes.Pie:
                ChartFieldsComponent = PieChartFields;
                break;
            case ChartTypes.Bars:
            case ChartTypes.Columns:
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
            </React.Fragment>
        )
    }
}


export default EditChart
