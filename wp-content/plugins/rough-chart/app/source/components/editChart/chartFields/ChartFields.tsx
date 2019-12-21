import { h } from 'preact';
import { PureComponent, Fragment } from 'preact/compat';
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

class ChartFields extends PureComponent<IProps, IState> {
    public state = {
        title: '',
        titleErr: false,
    };

    updateTitle = (title: string) => {
        this.setState({
            title,
        })
    };

    renderTitle() {
        return (
            <FormTable>
                <PropInput
                    title={t('title')}
                    onChange={this.updateTitle}
                    value={this.state.title}
                    error={this.state.titleErr}
                />
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
