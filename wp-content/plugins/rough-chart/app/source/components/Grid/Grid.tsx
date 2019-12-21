import { h } from 'preact';

import './Grid.less';

interface IProps {
    children?: any;
    size?: string; // lg, md, sm
}

const Grid = (props: IProps) => (
    <div className='grid'>
        {props.children}
    </div>
);

export default Grid;
