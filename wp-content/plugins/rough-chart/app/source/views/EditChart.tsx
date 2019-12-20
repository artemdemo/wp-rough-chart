import {Component, Fragment, h} from 'preact';
import ChartTypes from '../components/editChart/chartTypes';
import PieChartFields from '../components/editChart/chartFields/PieChartFields';

interface IProps {
    type: ChartTypes;
}

interface IState {}

class EditChart extends Component<IProps, IState> {
    constructor(props) {
        super(props);
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
                <h1 className='wp-heading-inline'>New Rough Chart</h1>
                <hr className='wp-header-end' />
                <h2 className='screen-reader-text'>New Rough Chart options</h2>
                {this.renderFields()}
            </Fragment>
        )
    }
}


export default EditChart
