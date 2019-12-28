import React from 'react';

interface IProps {
    children?: any;
    colSpan?: number;
    className?: string;
}

const Td = (props: IProps) => (
    <td colSpan={props.colSpan} className={props.className}>
        {props.children}
    </td>
);

export default Td;
