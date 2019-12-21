import { Component, h } from 'preact';
import FormField from '../FormTable/FormField';
import { t } from '../../services/i18n';

interface IProps {
    value: string;
    onChange: (value: string) => void;
}

interface IState {
    inputId: string;
}

const STYLES = [
    { type: 'hachure', name: 'Hachure' },
    { type: 'cross-hatch', name: 'Cross-Hatch' },
    { type: 'zigzag', name: 'Zigzag' },
    { type: 'dashed', name: 'Dashed' },
    { type: 'solid', name: 'Solid' },
    { type: 'zigzag-line', name: 'Zigzag-Line' },
];

class FillStyle extends Component<IProps, IState> {
    state = {
        inputId: 'chart_fill_style',
    };

    handleChange = (e) => {
        const { onChange } = this.props;
        onChange(e.target.value);
    };

    render(props: IProps, state: IState, context) {
        return (
            <FormField
                title={t('fillStyle')}
                htmlFor={this.state.inputId}
            >
                <select
                    id={this.state.inputId}
                    value={props.value}
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
