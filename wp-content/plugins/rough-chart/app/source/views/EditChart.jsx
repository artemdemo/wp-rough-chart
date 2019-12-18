import { Component, Fragment, h } from 'preact';
import ChartTitle from '../components/editChart/ChartTitle';
import FillStyle from '../components/editChart/FillStyle';
import StrokeWidth from '../components/editChart/StrokeWidth';
import FillWeight from '../components/editChart/FillWeight';
import Roughness from '../components/editChart/Roughness';
import XLabel from '../components/editChart/XLabel';
import YLabel from '../components/editChart/YLabel';
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
                        <ChartTitle />
                        <FillStyle />
                        <StrokeWidth />
                        <FillWeight />
                        <Roughness />
                        <XLabel />
                        <YLabel />
                    </tbody>
                </table>
                <Data />
            </Fragment>
        )
    }
}


export default EditChart
