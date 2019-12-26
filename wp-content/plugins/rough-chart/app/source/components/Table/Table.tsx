import { h } from 'preact';

interface IProps {
    children?: any;
}

const Table = (props: IProps) => (
    <table className='wp-list-table widefat fixed striped'>
        {props.children}
    </table>
);

export default Table;
