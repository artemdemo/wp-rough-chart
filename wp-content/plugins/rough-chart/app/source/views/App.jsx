import { Component, Fragment, h } from 'preact';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render(props, state) {
        return (
            <Fragment>
                <h1 className="wp-heading-inline">New Rough Chart</h1>
                <hr className="wp-header-end" />
                <h2 className="screen-reader-text">New Rough Chart options</h2>
            </Fragment>
        )
    }
}


export default App
