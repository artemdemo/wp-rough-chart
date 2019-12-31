import React from 'react';
import Th from '../../components/Table/Th';
import Td from '../../components/Table/Td';
import Tr from '../../components/Table/Tr';
import RowActions from '../../components/Table/RowActions';
import { t } from '../../services/i18n';
import { ChartDB } from '../../chartTypes';

interface IProps {
    chart: ChartDB;
    onDelete: (chartId: number) => void;
}

interface IState {}

class ChartsListItem extends React.PureComponent<IProps, IState> {
    handleDelete = (e): void => {
        e.preventDefault();
        const { chart, onDelete } = this.props;
        onDelete(chart.id)
    };

    render() {
        const { chart } = this.props;
        return (
            <Tr>
                <Th hasRowActions>
                    <strong>
                        <a href='#'>
                            {chart.title}
                        </a>
                    </strong>
                    <RowActions>
                        <a href='#'>
                            {t('edit')}
                        </a> |{' '}
                        <a href='#'
                           onClick={this.handleDelete}
                        >
                            {t('delete')}
                        </a>
                    </RowActions>
                </Th>
                <Td>{chart.chart_type}</Td>
                <Td>{chart.created}</Td>
                <Td>{chart.last_updated}</Td>
                <Td hasRowActions>
                    [roughchart id="{chart.id}"]
                    <RowActions>
                        <a href='#'>
                            {t('copy')}
                        </a>
                    </RowActions>
                </Td>
            </Tr>
        );
    }
}

export default ChartsListItem;
