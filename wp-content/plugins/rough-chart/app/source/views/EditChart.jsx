import { Component, Fragment, h } from 'preact';
import ChartPropInput from '../components/editChart/ChartPropInput';
import FillStyle from '../components/editChart/FillStyle';
import Data from '../components/editChart/Data';

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
                        <ChartPropInput title='Title' />
                        <FillStyle />
                        <ChartPropInput title='Stroke Width' />
                        <ChartPropInput title='Fill Weight' />
                        <ChartPropInput title='Roughness' />
                        <ChartPropInput title='X Label' />
                        <ChartPropInput title='Y Label' />
                    </tbody>
                </table>
                <Data />
            </Fragment>
        )
    }
}


export default EditChart
