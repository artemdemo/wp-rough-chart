import { Component, h } from 'preact';
import { rndSalt } from '../../services/utils';
import FormField from '../FormTable/FormField';

import './PropInput.less';

interface IProps {
    title?: string;
    description?: string;
}

interface IState {
    inputId: string;
}

class PropInput extends Component<IProps, IState> {
    static defaultProps = {
        title: '',
        description: '',
    };

    public state = {
        inputId: 'prop-input',
    };

    componentDidMount(): void {
        this.setState({
            inputId: `${this.state.inputId}-${rndSalt()}`,
        })
    }

    render(props: IProps, state: IState, context) {
        return (
            <FormField
                title={props.title}
                htmlFor={this.state.inputId}
            >
                <div className='prop-input-data'>
                    <input
                        id={this.state.inputId}
                        type='text'
                        aria-required='true'
                        autoCorrect='off'
                    />
                    <p className='description'>
                        {props.description}
                    </p>
                </div>
            </FormField>
        )
    }
}

export default PropInput;
