import { Component, h, createRef } from 'preact';
import FormField from '../FormTable/FormField';
import ColorPicker from '../ColorPicker/ColorPicker';

import './PropColor.less';

interface IProps {
    title?: string;
}

interface IState {
    color: string;
}

class PropColor extends Component<IProps, IState> {
    static defaultProps = {
        title: '',
    };

    public state = {
        color: 'rgba(44, 83, 144, 1)',
    };

    onChangeColor = (color: string) => {
        this.setState({ color })
    };

    render(props, state, context) {
        return (
            <FormField
                title={props.title}
            >
                <ColorPicker
                    className='prop-color-picker'
                    color={this.state.color}
                    onChange={this.onChangeColor}
                />
                {this.state.color}
            </FormField>
        )
    }
}

export default PropColor;
