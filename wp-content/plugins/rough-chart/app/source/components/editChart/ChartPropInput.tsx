import { Component, h } from 'preact';

interface IProps {
    title?: string;
}

interface IState {
    inputId: string;
}

class ChartPropInput extends Component<IProps, IState> {
    static defaultProps = {
        title: '',
    };

    public state = {
        inputId: 'chart-stroke-width',
    };

    render(props, state, context) {
        return (
            <tr className='form-field'>
                <th scope='row'>
                    <label htmlFor={this.state.inputId}>
                        {props.title}
                    </label>
                </th>
                <td>
                    <input
                        id={this.state.inputId}
                        type='text'
                        aria-required='true'
                        autoCorrect='off'
                    />
                </td>
            </tr>
        )
    }
}

export default ChartPropInput;
