import React from 'react';
import Title from '../components/Title/Title';
import { t } from '../services/i18n';
import { getUrlToChart } from '../services/appData';
import ChartTypes from '../containers/chartTypes';

interface IProps {}

interface IState {}

class NewChart extends React.PureComponent<IProps, IState> {
    render() {
        return (
            <React.Fragment>
                <Title>{t('newChart')}</Title>
                <a href={getUrlToChart('new', ChartTypes.Pie)}>
                    {t('pie')}
                </a>
                <br />
                <a href={getUrlToChart('new', ChartTypes.Columns)}>
                    {t('columns')}
                </a>
                <br />
                <a href={getUrlToChart('new', ChartTypes.Bars)}>
                    {t('bars')}
                </a>
            </React.Fragment>
        );
    }
}

export default NewChart;
