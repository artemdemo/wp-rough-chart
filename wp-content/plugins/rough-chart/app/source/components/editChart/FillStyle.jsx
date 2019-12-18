import { Component, h } from 'preact';
import FormField from '../FormTable/FormField';

class FillStyle extends Component {
    state = {
        inputId: 'chart_fill_style',
    };

    render(props, state, context) {
        return (
            <FormField
                title='Fill Style'
                htmlFor={this.state.inputId}
            >
                <select
                    id={this.state.inputId}
                    className='postform'
                >
                    <option value='hachure'>Hachure</option>
                    <option className='level-0' value='1'>Uncategorized</option>
                </select>
            </FormField>
        );
    }
}

export default FillStyle;
