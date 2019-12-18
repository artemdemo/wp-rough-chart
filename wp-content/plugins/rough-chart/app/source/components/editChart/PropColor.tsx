import { Component, h, createRef } from 'preact';
import { rndSalt } from '../../services/utils';
import FormField from '../FormTable/FormField';

import './PropColor.less'

interface IProps {
    title?: string;
}

interface IState {
    inputId: string;
}

class PropColor extends Component<IProps, IState> {
    static defaultProps = {
        title: '',
    };

    public state = {
        inputId: 'prop-color',
    };

    colorRef = createRef();
    colorContainerRef = createRef();
    colorPicker;

    componentDidMount(): void {
        this.setState({
            inputId: `${this.state.inputId}-${rndSalt()}`,
        });
        import('@simonwep/pickr')
            .then(({ default: Pickr }) => {
                this.colorPicker = new Pickr({
                    el: this.colorRef.current,
                    container: this.colorContainerRef.current,
                    theme: 'classic',
                    components: {
                        preview: true,
                        //opacity: true,
                        hue: true,

                        interaction: {
                            rgba: true,
                            input: true,
                            save: true
                        }
                    },
                });
                this.colorPicker.on('save', console.log);
            });
    }

    render(props, state, context) {
        return (
            <FormField
                title={props.title}
                htmlFor={this.state.inputId}
            >
                <div ref={this.colorRef} />
                <div ref={this.colorContainerRef} />
            </FormField>
        )
    }
}

export default PropColor;
