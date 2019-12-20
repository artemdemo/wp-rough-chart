import { Component, Fragment, h } from 'preact';
import ChartTypes from '../components/editChart/chartTypes';
import PieChartFields from '../components/editChart/chartFields/PieChartFields';
import Button, { BtnAppearance } from '../components/Button/Button';
import { t } from '../services/i18n';

interface IProps {
    type: ChartTypes;
}

interface IState {}

class EditChart extends Component<IProps, IState> {
    constructor(props) {
        super(props);
    }

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
            <ChartFieldsComponent />
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
                <Button appearance={BtnAppearance.Primary}>
                    {t('createNewChart')}
                </Button>
            </Fragment>
        )
    }
}


export default EditChart
