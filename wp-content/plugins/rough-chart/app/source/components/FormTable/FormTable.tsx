import { Component, h } from 'preact';

interface IProps {}
interface IState {}

class FormTable extends Component<IProps, IState> {
    render(props, state, context) {
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
