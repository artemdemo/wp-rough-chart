import { Component, h } from 'preact';
import EditChart from './EditChart';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render(props, state) {
        return (
            <EditChart />
        )
    }
}


export default App
