import React from 'react';

interface IProps {
    children?: any;
    colSpan?: number;
}

const Td = (props: IProps) => (
    <td colSpan={props.colSpan}>
        {props.children}
    </td>
);

export default Td;
