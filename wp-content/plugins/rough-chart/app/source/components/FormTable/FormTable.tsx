import { Component, h } from 'preact';

interface IProps {
    children?: any;
}
interface IState {}

class FormTable extends Component<IProps, IState> {
    render(props: IProps, state: IState, context) {
        return (
            <table
                className='form-table'
                role='presentation'
            >
                <tbody>
                    {props.children}
                </tbody>
            </table>
        );
    }
}

export default FormTable;
