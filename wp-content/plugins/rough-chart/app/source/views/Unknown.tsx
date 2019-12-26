import { h } from 'preact';
import { PureComponent } from 'preact/compat';

interface IProps {}

interface IState {}

class Unlnown extends PureComponent<IProps, IState> {
    render(props: IProps, state: IState, context) {
        return (
            '404 - no such view'
        );
    }
}


export default Unlnown
