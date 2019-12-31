import React from 'react';
import FormTable from '../../components/FormTable/FormTable';
import PropInput from '../formProps/PropInput';
import ChartTypes from '../../chartTypes';
import Grid from '../../components/Grid/Grid';
import GridCell from '../../components/Grid/GridCell';
import { t } from '../../services/i18n';

interface IProps {}

interface IState {
    title: string;
}

class ChartFields extends React.PureComponent<IProps, IState> {
    public state = {
        title: '',  // title can be empty
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
                />
            </FormTable>
        );
    }

    renderChartFields() {
        return (
            <React.Fragment />
        );
    }

    renderChartData(type?: ChartTypes) {
        return (
            <React.Fragment />
        );
    }

    render() {
        return (
            <React.Fragment>
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
            </React.Fragment>
        );
    }
}

export default ChartFields;
