import { h } from 'preact';
import { PureComponent, Fragment } from 'preact/compat';
import { t } from '../services/i18n';
import { getUrlToChart } from '../services/appData';
import { getChartsData } from '../services/ajax';
import Table from '../components/Table/Table';
import Thead from '../components/Table/Thead';
import Tbody from '../components/Table/Tbody';
import Tr from '../components/Table/Tr';
import Th from '../components/Table/Th';

interface IProps {}

interface IState {
    charts: any[];
}

class ChartsList extends PureComponent<IProps, IState> {
    state = {
        charts: [],
    };

    componentDidMount(): void {
        getChartsData()
            .then((charts) => {
                this.setState({ charts });
            });
    }

    render(props: IProps, state: IState, context) {
        return (
            <Fragment>
                <h1 className='wp-heading-inline'>
                    {t('roughCharts')}
                </h1>
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
                            <Th>{t('created')}</Th>
                            <Th>{t('lastUpdated')}</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>

                        </Tr>
                    </Tbody>
                </Table>
            </Fragment>
        );
    }
}


export default ChartsList
