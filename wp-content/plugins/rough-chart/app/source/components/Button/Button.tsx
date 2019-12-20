import { Component, h } from 'preact';
import classnames from 'classnames';

export enum BtnAppearance {
    Primary,
    Secondary,
}

interface IProps {
    type?: string;
    className?: string;
    children?: any;
    appearance?: BtnAppearance;
    disabled?: boolean;
    onClick?: (e?: any) => void;
}
interface IState {}

class Button extends Component<IProps, IState> {
    static defaultPros = {
        type: 'button',
    };

    getClassName(): string {
        const { appearance, disabled, className } = this.props;
        return classnames(className, {
            button: true,
            'button-primary': appearance === BtnAppearance.Primary && !disabled,
            'button-primary-disabled': appearance === BtnAppearance.Primary && disabled,
            'button-disabled': appearance !== BtnAppearance.Primary && disabled,
        });
    }

    render(props: IProps, state: IState, context) {
        const { type, disabled, onClick } = props;
        return (
            <button
                type={type}
                className={this.getClassName()}
                disabled={disabled}
                onClick={onClick}
            >
                {props.children}
            </button>
        );
    }
}

export default Button;