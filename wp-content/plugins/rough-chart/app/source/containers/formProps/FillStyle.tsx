import { h } from 'preact';
import { PureComponent } from 'preact/compat';
import FormField from '../../components/FormTable/FormField';
import { t } from '../../services/i18n';

interface IProps {
    value: string;
    onChange: (value: string) => void;
    error?: boolean;
}

interface IState {
    inputId: string;
}

export const defaultStyle = { type: 'hachure', name: 'Hachure' };

const STYLES = [
    defaultStyle,
    { type: 'cross-hatch', name: 'Cross-Hatch' },
    { type: 'zigzag', name: 'Zigzag' },
    { type: 'dashed', name: 'Dashed' },
    { type: 'solid', name: 'Solid' },
    { type: 'zigzag-line', name: 'Zigzag-Line' },
];

class FillStyle extends PureComponent<IProps, IState> {
    state = {
        inputId: 'chart_fill_style',
    };

    handleChange = (e) => {
        const { onChange } = this.props;
        onChange(e.target.value);
    };

    render() {
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
                    className='postform'
                >
                    {STYLES.map(item => (
                        <option value={item.type}>
                            {item.name}
                        </option>
                    ))}
                </select>
            </FormField>
        );
    }
}

export default FillStyle;
