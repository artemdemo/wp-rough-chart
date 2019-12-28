import React from 'react';
import { t } from '../services/i18n';
import { getUrlToChart } from '../services/appData';
import { getAllChart, deleteChart } from '../services/ajax';
import Donate from '../containers/Donate/Donate';
import { Chart } from '../containers/chartTypes';
import ChartsListItem from '../containers/ChartsListItem/ChartsListItem';
import Loading from '../components/Loading/Loading';
import Title from '../components/Title/Title';
import Table from '../components/Table/Table';
import Thead from '../components/Table/Thead';
import Tbody from '../components/Table/Tbody';
import Tr from '../components/Table/Tr';
import Th from '../components/Table/Th';
import Td from '../components/Table/Td';

interface IProps {}

interface IState {
    loading: boolean;
    charts: Chart[];
}

class ChartsList extends React.PureComponent<IProps, IState> {
    state = {
        loading: true,
        charts: [],
    };

    componentDidMount(): void {
        getAllChart()
            .then((charts) => {
                this.setState({
                    charts,
                    loading: false,
                });
            });
    }

    handleDelete = (chartId: number): void => {
        deleteChart(chartId)
            .then(() => {
                this.setState({
                    charts: this.state.charts.filter((chart: Chart) => {
                        return chart.id !== chartId;
                    }),
                });
            });
    };

    renderCharts() {
        if (this.state.charts.length > 0) {
            return this.state.charts.map((chart: Chart) => (
                <ChartsListItem
                    chart={chart}
                    onDelete={this.handleDelete}
                    key={`chart-table-${chart.id}`}
                />
            ));
        }
        return (
            <Tr>
                <Td colSpan={4}>
                    {t('noCharts')}
                </Td>
            </Tr>
        );
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
                        {this.renderCharts()}
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
