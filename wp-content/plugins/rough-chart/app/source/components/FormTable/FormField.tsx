import { h } from 'preact';
import { PureComponent } from 'preact/compat';
import classnames from 'classnames';

import './FormField.less';

interface IProps {
    title?: string;
    htmlFor?: string;
    error?: boolean;
    children: any;
}

interface IState {}

class FormField extends PureComponent<IProps, IState> {
    render() {
        return (
            <tr className={classnames({
                'form-field': true,
                'form-invalid': this.props.error,
            })}>
                <th
                    className='form-field-row'
                    scope='row'
                >
                    <label htmlFor={this.props.htmlFor}>
                        {this.props.title}
                    </label>
                </th>
                <td>
                    {this.props.children}
                </td>
            </tr>
        );
    }
}

export default FormField;
