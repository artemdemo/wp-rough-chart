import React from 'react';
import Th from '../../components/Table/Th';
import Td from '../../components/Table/Td';
import Tr from '../../components/Table/Tr';
import { t } from '../../services/i18n';
import { Chart } from '../chartTypes';

interface IProps {
    chart: Chart;
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
                <Th className='has-row-actions'>
                    <strong>
                        <a href='#'>
                            {chart.title}
                        </a>
                    </strong>
                    <div className='row-actions'>
                        <span className="edit">
                            <a href='#'>
                                {t('edit')}
                            </a> |{' '}
                        </span>
                        <span className='delete'>
                            <a href='#'
                               className='delete-tag'
                               role='button'
                               onClick={this.handleDelete}
                            >
                                {t('delete')}
                            </a>
                        </span>
                    </div>
                </Th>
                <Td>{chart.chart_type}</Td>
                <Td>{chart.created}</Td>
                <Td>{chart.last_updated}</Td>
            </Tr>
        );
    }
}

export default ChartsListItem;
