import React from 'react';
import FormField from '../../components/FormTable/FormField';
import { t } from '../../services/i18n';

interface IProps {
    value: string;
    onChange: (value: string) => void;
    error?: boolean;
    disabled?: boolean;
}

interface IState {
    inputId: string;
}

export type TStyle = {
    type: string;
    name: string;
};

export const defaultStyle: TStyle = { type: 'hachure', name: 'Hachure' };

const STYLES: TStyle[] = [
    defaultStyle,
    { type: 'cross-hatch', name: 'Cross-Hatch' },
    { type: 'zigzag', name: 'Zigzag' },
    { type: 'dashed', name: 'Dashed' },
    { type: 'solid', name: 'Solid' },
    { type: 'zigzag-line', name: 'Zigzag-Line' },
];

class FillStyle extends React.PureComponent<IProps, IState> {
    static defaultProps = {
        error: false,
        disabled: false,
    };

    state = {
        inputId: 'chart_fill_style',
    };

    handleChange = (e) => {
        const { onChange } = this.props;
        onChange(e.target.value);
    };

    render() {
        const { disabled } = this.props;
        return (
            <FormField
                title={t('fillStyle')}
                htmlFor={this.state.inputId}
                error={this.props.error}
            >
                <select
                    id={this.state.inputId}
                    value={this.props.value}
                    onChange={this.handleChange}
                    disabled={disabled}
                    className='postform'
                >
                    {STYLES.map(item => (
                        <option value={item.type} key={item.type}>
                            {item.name}
                        </option>
                    ))}
                </select>
            </FormField>
        );
    }
}

export default FillStyle;
