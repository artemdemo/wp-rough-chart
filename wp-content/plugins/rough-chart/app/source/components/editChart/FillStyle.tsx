import { Component, h } from 'preact';
import FormField from '../FormTable/FormField';

interface IProps {}

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

    render(props: IProps, state: IState, context) {
        return (
            <FormField
                title='Fill Style'
                htmlFor={this.state.inputId}
            >
                <select
                    id={this.state.inputId}
                    className='postform'
                >
                    <option value='hachure'>hachure</option>
                    <option className='level-0' value='1'>Uncategorized</option>
                </select>
            </FormField>
        );
    }
}

export default FillStyle;
