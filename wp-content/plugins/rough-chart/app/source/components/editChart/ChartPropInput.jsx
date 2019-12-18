import { Component, h } from 'preact';

class ChartPropInput extends Component {
    state = {
        title: 'Stroke Width',
        inputId: 'chart-stroke-width',
    };

    render(props, state, context) {
        return (
            <tr className='form-field'>
                <th scope='row'>
                    <label htmlFor={this.state.inputId}>
                        {this.state.title}
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

export default ChartPropInput;
