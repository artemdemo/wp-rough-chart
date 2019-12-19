import { Component, Fragment, h } from 'preact';
import FormTable from '../components/FormTable/FormTable';
import PropInput from '../components/editChart/PropInput';
import PropColor from '../components/editChart/PropColor';
import FillStyle from '../components/editChart/FillStyle';
import Data from '../components/editChart/Data';
import Grid from '../components/Grid/Grid';
import GridCell from '../components/Grid/GridCell';

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
                <FormTable>
                    <PropInput title='Title' />
                </FormTable>
                <p>Define your new chart by filling options below:</p>
                <Grid size='lg'>
                    <GridCell columns={3}>
                        <FormTable>
                            <PropColor title='Default Fill' defaultColor='#427dd9' />
                            <PropColor title='Default Stroke' defaultColor='#2C5390' />
                            <FillStyle />
                            <PropInput title='Stroke Width' />
                            <PropInput title='Fill Weight' />
                            <PropInput title='Roughness' />
                            <PropInput title='X Label' />
                            <PropInput title='Y Label' />
                        </FormTable>
                    </GridCell>
                    <GridCell columns={9}>
                        <Data />
                    </GridCell>
                </Grid>
            </Fragment>
        )
    }
}


export default EditChart
