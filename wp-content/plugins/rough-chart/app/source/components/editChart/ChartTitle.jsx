import { Component, h } from 'preact';

class ChartTitle extends Component {
    state = {
        inputId: 'chart_title',
    };

    render(props, state, context) {
        return (
            <tr className='form-field'>
                <th scope='row'>
                    <label htmlFor={this.state.inputId}>
                        Title
                    </label>
                </th>
                <td>
                    <input
                        id={this.state.inputId}
                        type='text'
                        aria-required='true'
                        autoCapitalize='none'
                        autoCorrect='off'
                    />
                </td>
            </tr>
        )
    }
}

export default ChartTitle;
