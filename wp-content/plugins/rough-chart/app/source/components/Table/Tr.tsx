import { h } from 'preact';

interface IProps {
    children?: any;
}

const Tr = (props: IProps) => (
    <tr>
        {props.children}
    </tr>
);

export default Tr;
