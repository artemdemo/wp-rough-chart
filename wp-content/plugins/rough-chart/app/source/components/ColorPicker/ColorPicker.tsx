import React from 'react';
import classnames from 'classnames';
import iro from '@jaames/iro';
import ColorPickerPopup from './ColorPickerPopup';

import './ColorPicker.less';

interface IProps {
    color: string;
    className?: string;
    onChange?: (colorHex: string) => void;
}

interface IState {
    showPopup: boolean;
}

interface IIroColor {
    hexString: string;
    rgbString: string;
    hslString: string;
}

class ColorPicker extends React.PureComponent<IProps, IState> {
    private pickerRef = React.createRef();
    private colorPicker;

    public state = {
        showPopup: false,
    };

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

        this.colorPicker.on('color:change', this.handleColorChange);
    }

    handleColorChange = (color: IIroColor) => {
        const { onChange } = this.props;
        onChange && onChange(color.hexString);
    };

    handleClick = () => {
        this.setState(prevState => ({
            showPopup: !prevState.showPopup,
        }));
    };

    render() {
        const { className, color } = this.props;
        return (
            <React.Fragment>
                <div
                    className={classnames('color-picker-display', className)}
                    style={{
                        backgroundColor: color,
                    }}
                    onClick={this.handleClick}
                />
                <div className='color-picker-popup-container'>
                    <ColorPickerPopup
                        show={this.state.showPopup}
                    >
                        <div ref={this.pickerRef} />
                    </ColorPickerPopup>
                </div>
            </React.Fragment>
        );
    }
}

export default ColorPicker;
