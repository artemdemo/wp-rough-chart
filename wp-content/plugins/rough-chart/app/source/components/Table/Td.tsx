import React from 'react';

interface IProps {
    children?: any;
}

const Td = (props: IProps) => (
    <td>
        {props.children}
    </td>
);

export default Td;
