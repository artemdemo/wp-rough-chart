import { Component, Fragment, h } from 'preact';
import ChartTitle from '../components/editChart/ChartTitle';

class EditChart extends Component {
    constructor(props) {
        super(props);
    }

    render(props, state, context) {
        return (
            <Fragment>
                <h1 className='wp-heading-inline'>New Rough Chart</h1>
                <hr className='wp-header-end' />
                <h2 className='screen-reader-text'>New Rough Chart options</h2>
                <p>Define your new chart by defining options below:</p>
                <table className='form-table' role='presentation'>
                    <tbody>
                        <ChartTitle />
                    </tbody>
                </table>
            </Fragment>
        )
    }
}


export default EditChart
