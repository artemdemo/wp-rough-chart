import { Component, h } from 'preact';

interface IProps {
    title?: string;
    htmlFor?: string;
}

interface IState {}

class FormField extends Component<IProps, IState> {
    render(props, state, context) {
        return (
            <tr className='form-field'>
                <th scope='row'>
                    <label htmlFor={props.htmlFor}>
                        {props.title}
                    </label>
                </th>
                <td>
                    {props.children}
                </td>
            </tr>
        );
    }
}

export default FormField;
