import { h } from 'preact';
import { PureComponent } from 'preact/compat';

interface IProps {
    children?: any;
}
interface IState {}

const FormTable = (props: IProps) => (
    <table
        className='form-table'
        role='presentation'
    >
        <tbody>
        {props.children}
        </tbody>
    </table>
);

export default FormTable;
