import { Component, Fragment, h } from 'preact';
import FormTable from '../../FormTable/FormTable';
import PropInput from '../PropInput';
import ChartTypes from '../chartTypes';
import Grid from '../../Grid/Grid';
import GridCell from '../../Grid/GridCell';
import { t } from '../../../services/i18n';

export interface IProps {}

interface IState {
    title: string;
}

class ChartFields extends Component<IProps, IState> {
    public state = {
        title: '',
    };

    renderTitle() {
        return (
            <FormTable>
                <PropInput title={t('title')} />
            </FormTable>
        );
    }

    renderChartFields() {
        return (
            <Fragment />
        );
    }

    renderChartData(type?: ChartTypes) {
        return (
            <Fragment />
        );
    }

    render(props: IProps, state: IState, context) {
        return (
            <Fragment>
                {this.renderTitle()}
                <p>{t('defineChart')}</p>
                <Grid size='lg'>
                    <GridCell columns={3}>
                        <FormTable>
                            {this.renderChartFields()}
                        </FormTable>
                    </GridCell>
                    <GridCell columns={9}>
                        {this.renderChartData()}
                    </GridCell>
                </Grid>
            </Fragment>
        );
    }
}

export default ChartFields;
