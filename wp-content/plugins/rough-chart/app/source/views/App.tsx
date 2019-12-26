import { h } from 'preact';
import { PureComponent } from 'preact/compat';
import queryString from 'query-string';
import EditChart from './EditChart';
import ChartsList from './ChartsList';
import Unknown from './Unknown';
import ChartTypes from '../components/editChart/chartTypes';

interface IProps {}

interface IState {
    query: any;
}

class App extends PureComponent<IProps, IState> {
    state = {
        query: {
            chart_id: null,
        },
    };

    componentDidMount(): void {
        this.setState({
            query: queryString.parse(location.search),
        });
    }

    render(props: IProps, state: IState, context) {
        if (this.state.query.chart_id === 'new') {
            return (
                <EditChart
                    type={ChartTypes.Pie}
                />
            )
        } else if (!this.state.query.chart_id) {
            return (
                <ChartsList />
            )
        }
        return (
            <Unknown />
        );
    }
}


export default App
