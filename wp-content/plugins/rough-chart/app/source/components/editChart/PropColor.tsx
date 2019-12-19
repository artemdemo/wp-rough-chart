import { Component, h, createRef } from 'preact';
import FormField from '../FormTable/FormField';

import './PropColor.less'

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

    colorRef = createRef();
    colorContainerRef = createRef();
    colorPicker;

    componentDidMount(): void {
        // For some reason if it's not loaded asynchronously it silently kill the whole app.
        // I assume that the problem is related to the fact that DOM is not ready yet.
        // ToDo: There is a problem - I'm not sure this dynamic import will work as expected
        import('@simonwep/pickr')
            .then(({ default: Pickr }) => {
                // @docs https://github.com/Simonwep/pickr
                this.colorPicker = new Pickr({
                    el: this.colorRef.current,
                    container: this.colorContainerRef.current,
                    theme: 'classic',
                    default: this.state.color,
                    closeWithKey: 'Escape',
                    components: {
                        preview: true,
                        hue: true,

                        interaction: {
                            input: true,
                            save: true
                        }
                    },
                });
                this.colorPicker.on('save', this.onSaveColor);
            });
    }

    onSaveColor = (hsva) => {
        // In some cases `hsva` can be `null`.
        // For example if user clicked on `clear` button.
        // (this button should be presented in UI)
        if (hsva) {
            this.setState({
                color: hsva.toRGBA().toString(0),
            })
        }
    };

    render(props, state, context) {
        return (
            <FormField
                title={props.title}
            >
                <span ref={this.colorRef} />
                <span ref={this.colorContainerRef} />
                {this.state.color}
            </FormField>
        )
    }
}

export default PropColor;
