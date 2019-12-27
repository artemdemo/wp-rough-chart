import { h } from 'preact';
import { PureComponent, createRef, Fragment } from 'preact/compat';
import _omit from 'lodash/omit';
import ChartTypes from '../containers/chartTypes';
import PieChartFields from '../containers/chartFields/PieChartFields';
import Button, { BtnAppearance } from '../components/Button/Button';
import { t } from '../services/i18n';
import { saveChartData } from '../services/ajax';

interface IProps {
    type: ChartTypes;
}

interface IState {}

class EditChart extends PureComponent<IProps, IState> {
    private chartFieldsRef = createRef<PieChartFields>();

    saveChartData = () => {
        const chartData = this.chartFieldsRef?.current?.getData();
        if (chartData && !chartData.error) {
            saveChartData(_omit(chartData, ['error']))
                .done((result) => {
                    console.log(result);
                });
        }
    };

    renderTitle() {
        const { type } = this.props;
        switch (type) {
            case ChartTypes.Pie:
                return t('newBarChart');
            case ChartTypes.Bars:
            case ChartTypes.Columns:
            default:
                throw new Error(`No component fround for the given chart type: ${type}`);
        }
    }

    renderFields() {
        const { type } = this.props;
        let ChartFieldsComponent;
        switch (type) {
            case ChartTypes.Pie:
                ChartFieldsComponent = PieChartFields;
                break;
            case ChartTypes.Bars:
            case ChartTypes.Columns:
            default:
                throw new Error(`No component fround for the given chart type: ${type}`);
        }
        return (
            <ChartFieldsComponent ref={this.chartFieldsRef} />
        );
    }

    render(props: IProps, state: IState, context) {
        return (
            <Fragment>
                <h1 className='wp-heading-inline'>
                    {this.renderTitle()}
                </h1>
                <hr className='wp-header-end' />
                <h2 className='screen-reader-text'>
                    {t('newChartOptions')}
                </h2>
                {this.renderFields()}
                <Button
                    onClick={this.saveChartData}
                    appearance={BtnAppearance.Primary}
                >
                    {t('createNewChart')}
                </Button>
            </Fragment>
        )
    }
}


export default EditChart
