import { h } from 'preact';
import { PureComponent } from 'preact/compat';
import EditChart from './EditChart';
import ChartTypes from '../components/editChart/chartTypes';

interface IProps {}

interface IState {}

class App extends PureComponent<IProps, IState> {
    constructor(props) {
        super(props);
    }

    render(props: IProps, state: IState, context) {
        return (
            <EditChart
                type={ChartTypes.Pie}
            />
        )
    }
}


export default App
