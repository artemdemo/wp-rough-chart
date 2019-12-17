import { Component, Fragment, h } from 'preact';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render(props, state) {
        return (
            <Fragment>
                <h1 className='wp-heading-inline'>New Rough Chart</h1>
                <hr className='wp-header-end' />
                <h2 className='screen-reader-text'>New Rough Chart options</h2>
                <p>Define your new chart by defining options below:</p>
                <table className='form-table' role='presentation'>
                    <tbody>
                        <tr className='form-field form-required'>
                            <th scope='row'>
                                <label htmlFor='chart_title'>
                                    Title
                                </label>
                            </th>
                            <td>
                                <input
                                    id='chart_title'
                                    type='text'
                                    aria-required='true'
                                    autoCapitalize='none'
                                    autoCorrect='off'
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Fragment>
        )
    }
}


export default App
