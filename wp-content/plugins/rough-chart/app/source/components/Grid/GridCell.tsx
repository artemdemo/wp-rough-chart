import { h } from 'preact';
import classnames from 'classnames';

import './GridCell.less';

interface IProps {
    children?: any;
    columns: number;
}

const GridCell = (props: IProps) => (
    <div className={classnames('grid-cell', `grid-cell_col-${props.columns}`)}>
        {props.children}
    </div>
);

export default GridCell;
