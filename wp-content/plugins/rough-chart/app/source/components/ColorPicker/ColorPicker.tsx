import { Component, h, Fragment, createRef } from 'preact';
import classnames from 'classnames';
import iro from '@jaames/iro';

import './ColorPicker.less';

interface IProps {
    color?: string;
    className?: string;
    onChange?: (colorHex: string) => void;
}

interface IState {
    color: string;
}

class ColorPicker extends Component<IProps, IState> {
    private pickerRef = createRef();
    private colorPicker;

    componentDidMount(): void {
        const { color } = this.props;
        // color picker options
        // Option guide: https://iro.js.org/guide.html#color-picker-options
        this.colorPicker = new iro.ColorPicker(this.pickerRef.current, {
            width: 180,
            color: color,
            borderWidth: 1,
            borderColor: '#fff',
        });
    }

    render(props, state, context) {
        const { className, color } = props;
        return (
            <Fragment>
                <div
                    className={classnames('color-picker-display', className)}
                    style={{
                        backgroundColor: color,
                    }}
                />
                <div ref={this.pickerRef} />
            </Fragment>
        );
    }
}

export default ColorPicker;
