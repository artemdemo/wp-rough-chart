import { Component, h } from 'preact';

class FillStyle extends Component {
    state = {
        inputId: 'chart_fill_style',
    };

    render(props, state, context) {
        return (
            <tr className='form-field'>
                <th scope='row'>
                    <label htmlFor={this.state.inputId}>
                        Fill Style
                    </label>
                </th>
                <td>
                    <select
                        id={this.state.inputId}
                        className="postform"
                    >
                        <option value="hachure">Hachure</option>
                        <option className="level-0" value="1">Uncategorized</option>
                    </select>
                </td>
            </tr>
        );
    }
}

export default FillStyle;
