import { h } from 'preact';

interface IProps {
    children?: any;
}

const Tbody = (props: IProps) => (
    <tbody>
        {props.children}
    </tbody>
);

export default Tbody;
