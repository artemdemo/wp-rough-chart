import React from 'react';
import { t } from '../services/i18n';
import { getUrlToChart } from '../services/appData';
import { getChartsData } from '../services/ajax';
import Donate from '../containers/Donate/Donate';
import Loading from '../components/Loading/Loading';
import Title from '../components/Title/Title';
import Table from '../components/Table/Table';
import Thead from '../components/Table/Thead';
import Tbody from '../components/Table/Tbody';
import Tr from '../components/Table/Tr';
import Th from '../components/Table/Th';
import ChartsListItem from '../containers/ChartsListItem/ChartsListItem';

interface IProps {}

interface IState {
    loading: boolean;
    charts: any[];
}

class ChartsList extends React.PureComponent<IProps, IState> {
    state = {
        loading: true,
        charts: [],
    };

    componentDidMount(): void {
        getChartsData()
            .then((charts) => {
                this.setState({
                    charts,
                    loading: false,
                });
            });
    }

    render() {
        return (
            <React.Fragment>
                <Donate />
                <Title inline>
                    {t('roughCharts')}
                </Title>
                <a href={getUrlToChart('new')}
                   className='page-title-action'
                >
                    {t('addNew')}
                </a>
                <hr className='wp-header-end' />
                <h2 className='screen-reader-text'>
                    {t('roughChartsList')}
                </h2>
                <Table>
                    <Thead>
                        <Tr>
                            <Th>{t('title')}</Th>
                            <Th>{t('type')}</Th>
                            <Th>{t('created')}</Th>
                            <Th>{t('lastUpdated')}</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {this.state.charts.map((chart: any) => (
                            <ChartsListItem
                                chart={chart}
                                key={`chart-table-${chart.id}`}
                            />
                        ))}
                    </Tbody>
                </Table>
                <Loading
                    show={this.state.loading}
                />
            </React.Fragment>
        );
    }
}


export default ChartsList
