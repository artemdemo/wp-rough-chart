import { Component, h } from 'preact';
import classnames from 'classnames';

import './ColorPickerPopup.less';

interface IProps {
    show?: boolean;
}

interface IState {}

class ColorPickerPopup extends Component<IProps, IState> {
    render(props, state, context) {
        return (
            <div
                className={classnames({
                    'color-picker-popup': true,
                    'color-picker-popup_show': props.show,
                })}
            >
                {props.children}
            </div>
        );
    }
}

export default ColorPickerPopup;
