import { Component, h } from 'preact';
import classnames from 'classnames';

// form-invalid

import './FormField.less';

interface IProps {
    title?: string;
    htmlFor?: string;
    error?: boolean;
    children: any;
}

interface IState {}

class FormField extends Component<IProps, IState> {
    render(props: IProps, state: IState, context) {
        return (
            <tr className={classnames({
                'form-field': true,
                'form-invalid': props.error,
            })}>
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
