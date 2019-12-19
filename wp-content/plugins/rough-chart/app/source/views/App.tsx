import { Component, h } from 'preact';
import EditChart from './EditChart';
import ChartTypes from '../components/editChart/chartTypes';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render(props, state, context) {
        return (
            <EditChart
                type={ChartTypes.Pie}
            />
        )
    }
}


export default App
