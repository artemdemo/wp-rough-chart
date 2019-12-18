import { Component, h } from 'preact';
import { rndSalt } from '../../services/utils';
import FormField from '../FormTable/FormField';

interface IProps {
    title?: string;
}

interface IState {
    inputId: string;
}

class PropInput extends Component<IProps, IState> {
    static defaultProps = {
        title: '',
    };

    public state = {
        inputId: 'prop-input',
    };

    componentDidMount(): void {
        this.setState({
            inputId: `${this.state.inputId}-${rndSalt()}`,
        })
    }

    render(props, state, context) {
        return (
            <FormField
                title={props.title}
                htmlFor={this.state.inputId}
            >
                <input
                    id={this.state.inputId}
                    type='text'
                    aria-required='true'
                    autoCorrect='off'
                />
            </FormField>
        )
    }
}

export default PropInput;
