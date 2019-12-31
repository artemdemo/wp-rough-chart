import React from 'react';
import Th from '../../components/Table/Th';
import Td from '../../components/Table/Td';
import Tr from '../../components/Table/Tr';
import RowActions from '../../components/Table/RowActions';
import { sendNotification } from '../../components/Notifications/Notifications';
import { t } from '../../services/i18n';
import { ChartDB } from '../../chartTypes';
import copyToClipboard from '../../services/copyToClipboard';

interface IProps {
    chart: ChartDB;
    onDelete: (chartId: number) => void;
}

interface IState {}

class ChartsListItem extends React.PureComponent<IProps, IState> {
    getDefaultShortcode(): string {
        const { chart } = this.props;
        return `[roughchart id="${chart.id}"]`
    }

    handleDelete = (e: any): void => {
        e.preventDefault();
        const { chart, onDelete } = this.props;
        onDelete(chart.id)
    };

    handleCopy = (e: any): void => {
        e.preventDefault();
        const copyResult = copyToClipboard(this.getDefaultShortcode());
        if (!!copyResult) {
            sendNotification(t('shortcodeCopied'));
        }
    };

    renderTitle() {
        const {chart} = this.props;
        if (!chart.title || chart.title === '') {
            return (
                <i>
                    {t('noTitle')}
                </i>
            );
        }
        return (
            <strong>
                {chart.title}
            </strong>
        );
    }

    render() {
        const { chart } = this.props;
        return (
            <Tr>
                <Th hasRowActions>
                    <a href='#'>
                        {this.renderTitle()}
                    </a>
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
                    {this.getDefaultShortcode()}
                    <RowActions>
                        <a href='#'
                           onClick={this.handleCopy}
                        >
                            {t('copy')}
                        </a>
                    </RowActions>
                </Td>
            </Tr>
        );
    }
}

export default ChartsListItem;
