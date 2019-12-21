import { h } from 'preact';
import { PureComponent } from 'preact/compat';
import FormField from '../FormTable/FormField';
import ColorPicker from '../ColorPicker/ColorPicker';

import './PropColor.less';

interface IProps {
    title?: string;
    defaultColor?: string;
}

interface IState {
    color: string;
}

class PropColor extends PureComponent<IProps, IState> {
    static defaultProps = {
        title: '',
    };

    public state = {
        color: '#2C5390',
    };

    componentDidMount(): void {
        const { defaultColor } = this.props;
        if (defaultColor) {
            this.setState({
                color: defaultColor,
            })
        }
    }

    onChangeColor = (color: string) => {
        this.setState({ color })
    };

    render() {
        return (
            <FormField
                title={this.props.title}
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
