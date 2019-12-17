import { Component, h } from 'preact';

class App extends Component {
    state = {
        title: 'local state'
    };

    constructor(props) {
        super(props);
        this.state.title += ' - ' + props.title;
    }

    componentDidMount() {
        setTimeout(() => {
            let state = this.state;

            state.title = `Preact's [componentDidMount] worked as expected`;
            this.setState(state);
        }, 2000);
    }

    render(props, state) {
        return (
            <div>
                <h1>{props.title}</h1>
                <p>
                    {state.title}
                </p>
            </div>
        )
    }
}


export default App
