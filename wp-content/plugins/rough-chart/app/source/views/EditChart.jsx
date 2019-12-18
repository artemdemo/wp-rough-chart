import { Component, Fragment, h } from 'preact';
import FormTable from '../components/FormTable/FormTable';
import PropInput from '../components/editChart/PropInput';
import PropColor from '../components/editChart/PropColor';
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
                <p>Define your new chart by filling options below:</p>
                <FormTable>
                    <PropInput title='Title' />
                    <PropColor title='Color' />
                    <PropColor title='Stroke' />
                    <FillStyle />
                    <PropInput title='Stroke Width' />
                    <PropInput title='Fill Weight' />
                    <PropInput title='Roughness' />
                    <PropInput title='X Label' />
                    <PropInput title='Y Label' />
                </FormTable>
                <Data />
            </Fragment>
        )
    }
}


export default EditChart
