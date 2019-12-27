import { h } from 'preact';
import { PureComponent, Fragment } from 'preact/compat';
import FormTable from '../../components/FormTable/FormTable';
import PropInput from '../../components/formProps/PropInput';
import ChartTypes from '../chartTypes';
import Grid from '../../components/Grid/Grid';
import GridCell from '../../components/Grid/GridCell';
import { t } from '../../services/i18n';

interface IProps {}

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
                <Grid>
                    <GridCell columns='lg-4 md-12'>
                        <FormTable>
                            {this.renderChartFields()}
                        </FormTable>
                    </GridCell>
                    <GridCell columns='lg-8 md-12'>
                        {this.renderChartData()}
                    </GridCell>
                </Grid>
            </Fragment>
        );
    }
}

export default ChartFields;
