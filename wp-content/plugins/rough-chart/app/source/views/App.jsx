import { Component, h } from 'preact';
import EditChart from './EditChart';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render(props, state, context) {
        return (
            <EditChart />
        )
    }
}


export default App
