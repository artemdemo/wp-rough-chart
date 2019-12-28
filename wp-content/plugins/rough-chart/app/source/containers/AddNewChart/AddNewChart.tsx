import React from 'react';
import styled from 'styled-components';
import { t } from '../../services/i18n';
import { getUrlToChart } from '../../services/appData';
import Modal from '../../components/Modal/Modal';
import Button from "../../components/Button/Button";
import ChartTypes from '../chartTypes';

const Popup = styled(Modal)`
    min-width: 300px;
`;

interface IProps {}
interface IState {}

class AddNewChart extends React.PureComponent<IProps, IState> {
    state = {
        showSelectChartModal: false,
    };

    clickAddChart = (e) => {
        e.preventDefault();
        this.setState({
            showSelectChartModal: true,
        });
    };

    render() {
        return (
            <React.Fragment>
                <a onClick={this.clickAddChart}
                   className='page-title-action'
                >
                    {t('addNew')}
                </a>
                <Popup
                    title='Select chart'
                    show={this.state.showSelectChartModal}
                    buttons={() => (
                        <React.Fragment>
                            <Button
                                onClick={() => this.setState({
                                    showSelectChartModal: false,
                                })}
                            >
                                {t('cancel')}
                            </Button>
                        </React.Fragment>
                    )}
                >
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
                </Popup>
            </React.Fragment>
        );
    }
}

export default AddNewChart;
