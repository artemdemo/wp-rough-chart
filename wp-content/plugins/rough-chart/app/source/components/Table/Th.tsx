import { h } from 'preact';

interface IProps {
    children?: any;
    className?: string;
}

const Th = (props: IProps) => (
    <th scope='col' className={props.className}>
        {props.children}
    </th>
);

export default Th;
