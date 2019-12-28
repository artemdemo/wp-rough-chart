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
import Modal from '../components/Modal/Modal';
import Button, { BtnAppearance } from '../components/Button/Button';

interface IProps {}

interface IState {
    loading: boolean;
    chartIdToDelete: number;
    charts: Chart[];
}

class ChartsList extends React.PureComponent<IProps, IState> {
    state = {
        loading: true,
        chartIdToDelete: -1,
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

    handelDelete = () => {
        deleteChart(this.state.chartIdToDelete)
            .then(() => {
                this.setState(prevState => ({
                    charts: this.state.charts.filter((chart: Chart) => {
                        return chart.id !== prevState.chartIdToDelete;
                    }),
                    chartIdToDelete: -1,
                }));
            });
    };

    showDeleteWarning = (chartId: number): void => {
        this.setState({
            chartIdToDelete: chartId,
        });
    };

    renderCharts() {
        if (this.state.charts.length > 0) {
            return this.state.charts.map((chart: Chart) => (
                <ChartsListItem
                    chart={chart}
                    onDelete={this.showDeleteWarning}
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
                <Modal
                    title={t('deletingChart')}
                    show={this.state.chartIdToDelete > -1}
                    buttons={() => (
                        <React.Fragment>
                            <Button
                                appearance={BtnAppearance.Primary}
                                onClick={this.handelDelete}
                            >
                                {t('yesDelete')}
                            </Button>
                            {' '}
                            <Button
                                onClick={() => this.setState({
                                    chartIdToDelete: -1,
                                })}
                            >
                                {t('cancel')}
                            </Button>
                        </React.Fragment>
                    )}
                >
                    {t('areYouSureDelete')}
                </Modal>
            </React.Fragment>
        );
    }
}


export default ChartsList