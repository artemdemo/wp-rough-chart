import React from 'react';
import queryString from 'query-string';
import EditChart from './EditChart';
import ChartsList from './ChartsList';
import Unknown from './Unknown';
import ChartTypes from '../containers/chartTypes';

interface IProps {}

interface IState {
    query: any;
}

class App extends React.PureComponent<IProps, IState> {
    constructor(props) {
        super(props);

        this.state = {
            query: queryString.parse(location.search),
        };
    }

    render() {
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
