import { h } from 'preact';
import { PureComponent } from 'preact/compat';

interface IProps {
    children?: any;
}
interface IState {}

class FormTable extends PureComponent<IProps, IState> {
    render() {
        return (
            <table
                className='form-table'
                role='presentation'
            >
                <tbody>
                    {this.props.children}
                </tbody>
            </table>
        );
    }
}

export default FormTable;
