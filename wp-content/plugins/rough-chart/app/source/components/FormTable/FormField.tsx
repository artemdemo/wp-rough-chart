import { Component, h } from 'preact';

import './FormField.less';

interface IProps {
    title?: string;
    htmlFor?: string;
    children: any;
}

interface IState {}

class FormField extends Component<IProps, IState> {
    render(props: IProps, state: IState, context) {
        return (
            <tr className='form-field'>
                <th
                    className='form-field-row'
                    scope='row'
                >
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
