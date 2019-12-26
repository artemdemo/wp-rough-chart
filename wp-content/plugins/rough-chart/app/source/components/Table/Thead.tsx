import { h } from 'preact';

interface IProps {
    children?: any;
}

const Thead = (props: IProps) => (
    <thead>
        {props.children}
    </thead>
);

export default Thead;
