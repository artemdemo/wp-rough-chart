import { h } from 'preact';
import { PureComponent } from 'preact/compat';
import { rndSalt } from '../../services/utils';
import FormField from '../FormTable/FormField';

import './PropInput.less';

interface IProps {
    title?: string;
    description?: string;
    value: string|number;
    onChange: (value: string|number) => void;
    numeric?: boolean;
    error?: boolean;
}

interface IState {
    inputId: string;
}

class PropInput extends PureComponent<IProps, IState> {
    static defaultProps = {
        title: '',
        description: '',
        numeric: false,
    };

    public state = {
        inputId: 'prop-input',
    };

    componentDidMount(): void {
        this.setState({
            inputId: `${this.state.inputId}-${rndSalt()}`,
        })
    }

    handleChange = (e) => {
        const { onChange, numeric } = this.props;
        const value = numeric ? parseFloat(e.target.value) : e.target.value;
        onChange(value);
    };

    render() {
        return (
            <FormField
                title={this.props.title}
                htmlFor={this.state.inputId}
                error={this.props.error}
            >
                <div className='prop-input-data'>
                    <input
                        id={this.state.inputId}
                        onChange={this.handleChange}
                        value={String(this.props.value)}
                        type='text'
                        aria-required='true'
                        autoCorrect='off'
                    />
                    <p className='description'>
                        {this.props.description}
                    </p>
                </div>
            </FormField>
        )
    }
}

export default PropInput;
