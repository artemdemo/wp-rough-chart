import React from 'react';
import { rndSalt } from '../../services/utils';
import FormField from '../../components/FormTable/FormField';
import Description from '../../components/Description/Description';
import NumericInput from '../../components/NumericInput/NumericInput';

import './PropInput.less';

interface IProps {
    title?: string;
    description?: string;
    value: string|number;
    onChange: (e: any) => void;
    numeric?: boolean;
    error?: boolean;
}

interface IState {
    inputId: string;
}

class PropInput extends React.PureComponent<IProps, IState> {
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

    renderInput() {
        const { numeric, onChange } = this.props;
        const inputProps = {
            id: this.state.inputId,
            onChange,
            value: String(this.props.value),
            type: 'text',
            ariaRequired: 'true',
            autoCorrect: 'off',
        };
        if (numeric) {
            return (
                <NumericInput {...inputProps} />
            );
        }
        return (
            <input {...inputProps} />
        );
    }

    render() {
        return (
            <FormField
                title={this.props.title}
                htmlFor={this.state.inputId}
                error={this.props.error}
            >
                <div className='prop-input-data'>
                    {this.renderInput()}
                    <Description>
                        {this.props.description}
                    </Description>
                </div>
            </FormField>
        )
    }
}

export default PropInput;