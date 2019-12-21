import { h } from 'preact';
import { PureComponent } from 'preact/compat';
import classnames from 'classnames';

import './ColorPickerPopup.less';

interface IProps {
    show?: boolean;
}

interface IState {}

class ColorPickerPopup extends PureComponent<IProps, IState> {
    render() {
        return (
            <div
                className={classnames({
                    'color-picker-popup': true,
                    'color-picker-popup_show': this.props.show,
                })}
            >
                {this.props.children}
            </div>
        );
    }
}

export default ColorPickerPopup;
